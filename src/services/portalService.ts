import { db, auth, isFirebaseConfigured } from '../lib/firebase';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { 
  signInWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';

import {
  UserProfile,
  WorkerTask,
  EarlySalaryRequest,
  MaterialRequest,
  FieldExpense,
  ProjectReport,
  ActivityLog,
  RequestStatus,
  TaskStatus
} from '../types/portal';

import {
  INITIAL_USERS,
  INITIAL_TASKS,
  INITIAL_SALARY_REQUESTS,
  INITIAL_MATERIAL_REQUESTS,
  INITIAL_FIELD_EXPENSES,
  INITIAL_PROJECT_REPORTS,
  INITIAL_ACTIVITY_LOGS
} from '../lib/mockData';

const DB_VERSION_KEY = 'rumuli_portal_v5_clean';

// Storage keys
const STORAGE_KEYS = {
  CURRENT_USER: 'rumuli_portal_current_user',
  USERS: 'rumuli_portal_users',
  TASKS: 'rumuli_portal_tasks',
  SALARY: 'rumuli_portal_salary',
  MATERIALS: 'rumuli_portal_materials',
  EXPENSES: 'rumuli_portal_expenses',
  REPORTS: 'rumuli_portal_reports',
  LOGS: 'rumuli_portal_logs'
};

// Clean upgrade check to wipe legacy sample demo data
if (typeof window !== 'undefined') {
  if (localStorage.getItem(DB_VERSION_KEY) !== 'active') {
    localStorage.removeItem(STORAGE_KEYS.USERS);
    localStorage.removeItem(STORAGE_KEYS.TASKS);
    localStorage.removeItem(STORAGE_KEYS.SALARY);
    localStorage.removeItem(STORAGE_KEYS.MATERIALS);
    localStorage.removeItem(STORAGE_KEYS.EXPENSES);
    localStorage.removeItem(STORAGE_KEYS.REPORTS);
    localStorage.removeItem(STORAGE_KEYS.LOGS);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.setItem(DB_VERSION_KEY, 'active');
  }
}

function getLocalItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function setLocalItem<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('LocalStorage write error:', e);
  }
}

function nowTimestamp(): string {
  const d = new Date();
  return d.toISOString().replace('T', ' ').substring(0, 16);
}

export const PortalService = {
  // ==========================================
  // AUTHENTICATION
  // ==========================================
  async login(email: string, pass: string): Promise<UserProfile> {
    const normalizedEmail = email.trim().toLowerCase();
    const cleanPassword = pass.trim();

    // Check Master Admin requested: admin@rumuli.com / rumuli2026
    if (normalizedEmail === 'admin@rumuli.com' && cleanPassword === 'rumuli2026') {
      const adminProfile = INITIAL_USERS[0];
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(adminProfile));
      
      // Update in users registry
      const users = getLocalItem<UserProfile[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
      if (!users.some(u => u.email === adminProfile.email)) {
        users.unshift(adminProfile);
        setLocalItem(STORAGE_KEYS.USERS, users);
      }

      await this.logActivity(adminProfile.uid, adminProfile.name, 'Admin Authenticated', 'Master Administrator logged into Corporate Command Center.', 'AUTH');
      return adminProfile;
    }

    // Try Firestore if configured
    if (isFirebaseConfigured && db) {
      try {
        const q = query(collection(db, 'users'), where('email', '==', normalizedEmail));
        const snap = await getDocs(q);
        if (!snap.empty) {
          const userDoc = snap.docs[0].data() as UserProfile;
          if (userDoc.password && userDoc.password !== cleanPassword) {
            throw new Error('Invalid credentials: The password provided does not match this staff account.');
          }
          if (userDoc.status === 'INACTIVE') {
            throw new Error('Access Suspended: This staff account is currently inactive.');
          }
          localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userDoc));
          await this.logActivity(userDoc.uid, userDoc.name, 'Staff Signed In', `Authenticated via Firebase Cloud as ${userDoc.designation}.`, 'AUTH');
          return userDoc;
        }
      } catch (err: any) {
        if (err.message && err.message.includes('Invalid credentials')) throw err;
        console.warn('Firestore login check note:', err);
      }
    }

    // Local Registry check (for workers created by Admin)
    const users = getLocalItem<UserProfile[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
    const found = users.find(u => u.email.toLowerCase() === normalizedEmail);

    if (!found) {
      throw new Error('Access Denied: No staff account registered with this email. Only Administration can provision worker accounts.');
    }

    if (found.password && found.password !== cleanPassword) {
      throw new Error('Invalid Password: The password does not match the one configured by Administration.');
    }

    if (found.status === 'INACTIVE') {
      throw new Error('Access Suspended: This staff account has been set to inactive.');
    }

    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(found));
    await this.logActivity(found.uid, found.name, 'Staff Signed In', `Logged into internal portal as ${found.designation}.`, 'AUTH');
    return found;
  },

  getCurrentUser(): UserProfile | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  async logout(): Promise<void> {
    const user = this.getCurrentUser();
    if (user) {
      await this.logActivity(user.uid, user.name, 'Staff Signed Out', 'Signed out of session.', 'AUTH');
    }
    if (isFirebaseConfigured && auth) {
      try {
        await signOut(auth);
      } catch {}
    }
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  // ==========================================
  // PROFILE IMAGE ATTACHMENT / UPDATE
  // ==========================================
  async updateUserProfileImage(uid: string, avatarUrl: string): Promise<void> {
    const current = this.getCurrentUser();

    if (isFirebaseConfigured && db) {
      try {
        await updateDoc(doc(db, 'users', uid), { avatarUrl });
      } catch (err) {
        console.warn('Firestore avatar update fallback:', err);
      }
    }

    const users = getLocalItem<UserProfile[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
    const updated = users.map(u => u.uid === uid ? { ...u, avatarUrl } : u);
    setLocalItem(STORAGE_KEYS.USERS, updated);

    if (current && current.uid === uid) {
      current.avatarUrl = avatarUrl;
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(current));
    }

    await this.logActivity(uid, current?.name || 'Staff Member', 'Updated Profile Photo', 'New identification photo attached to profile.', 'AUTH');
  },

  // ==========================================
  // WORKER MANAGEMENT (ADMIN ONLY - CREATES PASSWORD & ACCOUNT)
  // ==========================================
  async getWorkers(): Promise<UserProfile[]> {
    if (isFirebaseConfigured && db) {
      try {
        const q = query(collection(db, 'users'));
        const snap = await getDocs(q);
        const list: UserProfile[] = [];
        snap.forEach(d => list.push(d.data() as UserProfile));
        if (list.length > 0) return list;
      } catch (err) {
        console.warn('Firestore getWorkers fallback:', err);
      }
    }
    return getLocalItem<UserProfile[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
  },

  async createWorker(newWorker: Omit<UserProfile, 'uid'>): Promise<UserProfile> {
    const admin = this.getCurrentUser();
    if (!admin || (admin.role !== 'ADMIN' && admin.role !== 'ASSISTANT')) {
      throw new Error('Unauthorized: Only Administrators and Operations Assistants have authority to create staff accounts.');
    }

    const uid = 'worker-' + Date.now();
    const profile: UserProfile = {
      ...newWorker,
      uid
    };

    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'users', uid), profile);
      } catch (err) {
        console.warn('Firestore createWorker fallback:', err);
      }
    }

    const users = getLocalItem<UserProfile[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
    users.push(profile);
    setLocalItem(STORAGE_KEYS.USERS, users);

    await this.logActivity(
      admin.uid, 
      admin.name, 
      'Admin Provisioned New Worker Account', 
      `Registered ${profile.name} (${profile.employeeId}) with assigned password. Department: ${profile.department}.`,
      'ADMIN'
    );

    return profile;
  },

  async updateWorkerStatus(uid: string, status: UserProfile['status']): Promise<void> {
    const admin = this.getCurrentUser();
    if (!admin || admin.role !== 'ADMIN') {
      throw new Error('Unauthorized');
    }

    if (isFirebaseConfigured && db) {
      try {
        await updateDoc(doc(db, 'users', uid), { status });
      } catch (err) {
        console.warn('Firestore updateWorkerStatus fallback:', err);
      }
    }

    const users = getLocalItem<UserProfile[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
    const updated = users.map(u => u.uid === uid ? { ...u, status } : u);
    setLocalItem(STORAGE_KEYS.USERS, updated);

    await this.logActivity(admin.uid, admin.name, 'Admin Updated Worker Status', `Changed status of worker ID ${uid} to ${status}.`, 'ADMIN');
  },

  // ==========================================
  // PROJECT REPORTS SUBMISSION & REVIEW
  // ==========================================
  async getProjectReports(workerUid?: string): Promise<ProjectReport[]> {
    if (isFirebaseConfigured && db) {
      try {
        let q;
        if (workerUid) {
          q = query(collection(db, 'project_reports'), where('workerUid', '==', workerUid));
        } else {
          q = query(collection(db, 'project_reports'));
        }
        const snap = await getDocs(q);
        const list: ProjectReport[] = [];
        snap.forEach(d => list.push({ ...d.data(), id: d.id } as ProjectReport));
        if (list.length > 0) return list;
      } catch (err) {
        console.warn('Firestore getProjectReports fallback:', err);
      }
    }

    const reports = getLocalItem<ProjectReport[]>(STORAGE_KEYS.REPORTS, INITIAL_PROJECT_REPORTS);
    if (workerUid) {
      return reports.filter(r => r.workerUid === workerUid);
    }
    return reports;
  },

  async submitProjectReport(data: Omit<ProjectReport, 'id' | 'workerUid' | 'workerName' | 'employeeId' | 'status' | 'submittedAt'>): Promise<ProjectReport> {
    const user = this.getCurrentUser();
    if (!user) throw new Error('Must be signed in to submit a project report.');

    const id = 'REP-' + Date.now().toString().slice(-6);
    const report: ProjectReport = {
      ...data,
      id,
      workerUid: user.uid,
      workerName: user.name,
      employeeId: user.employeeId,
      status: 'SUBMITTED',
      submittedAt: nowTimestamp()
    };

    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'project_reports', id), report);
      } catch (err) {
        console.warn('Firestore submitProjectReport fallback:', err);
      }
    }

    const reports = getLocalItem<ProjectReport[]>(STORAGE_KEYS.REPORTS, INITIAL_PROJECT_REPORTS);
    reports.unshift(report);
    setLocalItem(STORAGE_KEYS.REPORTS, reports);

    await this.logActivity(
      user.uid,
      user.name,
      'Project Field Report Submitted',
      `Filed site progress report for "${report.projectTitle}" at ${report.siteLocation} with ${report.photos.length} site photos attached.`,
      'REPORT'
    );

    return report;
  },

  async reviewProjectReport(reportId: string, status: ProjectReport['status'], reviewNotes: string): Promise<void> {
    const admin = this.getCurrentUser();
    if (!admin || admin.role !== 'ADMIN') throw new Error('Unauthorized');

    const reviewedAt = nowTimestamp();

    if (isFirebaseConfigured && db) {
      try {
        await updateDoc(doc(db, 'project_reports', reportId), {
          status,
          reviewNotes,
          reviewedBy: admin.name,
          reviewedAt
        });
      } catch (err) {
        console.warn('Firestore reviewProjectReport fallback:', err);
      }
    }

    const reports = getLocalItem<ProjectReport[]>(STORAGE_KEYS.REPORTS, INITIAL_PROJECT_REPORTS);
    const updated = reports.map(r => {
      if (r.id === reportId) {
        return {
          ...r,
          status,
          reviewNotes,
          reviewedBy: admin.name,
          reviewedAt
        };
      }
      return r;
    });
    setLocalItem(STORAGE_KEYS.REPORTS, updated);

    await this.logActivity(
      admin.uid,
      admin.name,
      `Project Report ${status}`,
      `Report ${reportId} marked as ${status} with feedback: "${reviewNotes}"`,
      'REPORT'
    );
  },

  // ==========================================
  // TASKS MANAGEMENT
  // ==========================================
  async getTasks(workerUid?: string): Promise<WorkerTask[]> {
    if (isFirebaseConfigured && db) {
      try {
        let q;
        if (workerUid) {
          q = query(collection(db, 'tasks'), where('assignedToUid', '==', workerUid));
        } else {
          q = query(collection(db, 'tasks'));
        }
        const snap = await getDocs(q);
        const list: WorkerTask[] = [];
        snap.forEach(d => list.push({ ...d.data(), id: d.id } as WorkerTask));
        if (list.length > 0) return list;
      } catch (err) {
        console.warn('Firestore getTasks fallback:', err);
      }
    }

    const tasks = getLocalItem<WorkerTask[]>(STORAGE_KEYS.TASKS, INITIAL_TASKS);
    if (workerUid) {
      return tasks.filter(t => t.assignedToUid === workerUid);
    }
    return tasks;
  },

  async createTask(taskData: Omit<WorkerTask, 'id' | 'createdAt' | 'updatedAt'>): Promise<WorkerTask> {
    const admin = this.getCurrentUser();
    if (!admin || admin.role !== 'ADMIN') throw new Error('Unauthorized');

    const id = 'TSK-' + Date.now().toString().slice(-6);
    const task: WorkerTask = {
      ...taskData,
      id,
      createdAt: nowTimestamp(),
      updatedAt: nowTimestamp()
    };

    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'tasks', id), task);
      } catch (err) {
        console.warn('Firestore createTask fallback:', err);
      }
    }

    const tasks = getLocalItem<WorkerTask[]>(STORAGE_KEYS.TASKS, INITIAL_TASKS);
    tasks.unshift(task);
    setLocalItem(STORAGE_KEYS.TASKS, tasks);

    await this.logActivity(
      admin.uid, 
      admin.name, 
      'Admin Assigned Task', 
      `Assigned task "${task.title}" to ${task.assignedToName} at ${task.location}.`,
      'TASK'
    );

    return task;
  },

  async updateTaskStatus(taskId: string, status: TaskStatus, completionNotes?: string): Promise<void> {
    const user = this.getCurrentUser();
    const updatedTimestamp = nowTimestamp();

    if (isFirebaseConfigured && db) {
      try {
        const ref = doc(db, 'tasks', taskId);
        await updateDoc(ref, { 
          status, 
          completionNotes: completionNotes || '', 
          updatedAt: updatedTimestamp 
        });
      } catch (err) {
        console.warn('Firestore updateTaskStatus fallback:', err);
      }
    }

    const tasks = getLocalItem<WorkerTask[]>(STORAGE_KEYS.TASKS, INITIAL_TASKS);
    const updated = tasks.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          status,
          completionNotes: completionNotes !== undefined ? completionNotes : t.completionNotes,
          updatedAt: updatedTimestamp
        };
      }
      return t;
    });
    setLocalItem(STORAGE_KEYS.TASKS, updated);

    if (user) {
      await this.logActivity(
        user.uid,
        user.name,
        `Task Status Updated to ${status}`,
        `Task ${taskId} status updated by ${user.name}.`,
        'TASK'
      );
    }
  },

  // ==========================================
  // EARLY SALARY ADVANCE REQUESTS
  // ==========================================
  async getSalaryRequests(workerUid?: string): Promise<EarlySalaryRequest[]> {
    if (isFirebaseConfigured && db) {
      try {
        let q;
        if (workerUid) {
          q = query(collection(db, 'salary_advances'), where('workerUid', '==', workerUid));
        } else {
          q = query(collection(db, 'salary_advances'));
        }
        const snap = await getDocs(q);
        const list: EarlySalaryRequest[] = [];
        snap.forEach(d => list.push({ ...d.data(), id: d.id } as EarlySalaryRequest));
        if (list.length > 0) return list;
      } catch (err) {
        console.warn('Firestore getSalaryRequests fallback:', err);
      }
    }

    const items = getLocalItem<EarlySalaryRequest[]>(STORAGE_KEYS.SALARY, INITIAL_SALARY_REQUESTS);
    if (workerUid) {
      return items.filter(s => s.workerUid === workerUid);
    }
    return items;
  },

  async requestEarlySalary(data: {
    requestedAmount: number;
    reason: string;
    repaymentTerms: string;
  }): Promise<EarlySalaryRequest> {
    const user = this.getCurrentUser();
    if (!user) throw new Error('You must be signed in.');

    const id = 'SAL-REQ-' + Date.now().toString().slice(-5);
    const req: EarlySalaryRequest = {
      id,
      workerUid: user.uid,
      workerName: user.name,
      employeeId: user.employeeId,
      department: user.department,
      requestedAmount: data.requestedAmount,
      currentSalary: user.baseSalary || 0,
      reason: data.reason,
      repaymentTerms: data.repaymentTerms,
      status: 'PENDING',
      requestedAt: nowTimestamp()
    };

    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'salary_advances', id), req);
      } catch (err) {
        console.warn('Firestore requestEarlySalary fallback:', err);
      }
    }

    const items = getLocalItem<EarlySalaryRequest[]>(STORAGE_KEYS.SALARY, INITIAL_SALARY_REQUESTS);
    items.unshift(req);
    setLocalItem(STORAGE_KEYS.SALARY, items);

    await this.logActivity(
      user.uid,
      user.name,
      'Early Salary Advance Requested',
      `Requested advance of ${data.requestedAmount.toLocaleString()} TZS.`,
      'SALARY'
    );

    return req;
  },

  async reviewSalaryRequest(requestId: string, status: RequestStatus, reviewNotes: string): Promise<void> {
    const admin = this.getCurrentUser();
    if (!admin || admin.role !== 'ADMIN') throw new Error('Unauthorized');

    const reviewedAt = nowTimestamp();

    if (isFirebaseConfigured && db) {
      try {
        await updateDoc(doc(db, 'salary_advances', requestId), {
          status,
          reviewNotes,
          reviewedBy: admin.name,
          reviewedAt
        });
      } catch (err) {
        console.warn('Firestore reviewSalaryRequest fallback:', err);
      }
    }

    const items = getLocalItem<EarlySalaryRequest[]>(STORAGE_KEYS.SALARY, INITIAL_SALARY_REQUESTS);
    const updated = items.map(s => {
      if (s.id === requestId) {
        return {
          ...s,
          status,
          reviewNotes,
          reviewedBy: admin.name,
          reviewedAt
        };
      }
      return s;
    });
    setLocalItem(STORAGE_KEYS.SALARY, updated);

    await this.logActivity(
      admin.uid,
      admin.name,
      `Salary Advance ${status}`,
      `Salary request ${requestId} marked as ${status}.`,
      'SALARY'
    );
  },

  // ==========================================
  // MATERIAL REQUISITIONS
  // ==========================================
  async getMaterialRequests(workerUid?: string): Promise<MaterialRequest[]> {
    if (isFirebaseConfigured && db) {
      try {
        let q;
        if (workerUid) {
          q = query(collection(db, 'material_requests'), where('workerUid', '==', workerUid));
        } else {
          q = query(collection(db, 'material_requests'));
        }
        const snap = await getDocs(q);
        const list: MaterialRequest[] = [];
        snap.forEach(d => list.push({ ...d.data(), id: d.id } as MaterialRequest));
        if (list.length > 0) return list;
      } catch (err) {
        console.warn('Firestore getMaterialRequests fallback:', err);
      }
    }

    const items = getLocalItem<MaterialRequest[]>(STORAGE_KEYS.MATERIALS, INITIAL_MATERIAL_REQUESTS);
    if (workerUid) {
      return items.filter(m => m.workerUid === workerUid);
    }
    return items;
  },

  async requestMaterials(data: Omit<MaterialRequest, 'id' | 'workerUid' | 'workerName' | 'employeeId' | 'status' | 'requestedAt'>): Promise<MaterialRequest> {
    const user = this.getCurrentUser();
    if (!user) throw new Error('Must be signed in.');

    const id = 'MAT-REQ-' + Date.now().toString().slice(-5);
    const req: MaterialRequest = {
      ...data,
      id,
      workerUid: user.uid,
      workerName: user.name,
      employeeId: user.employeeId,
      status: 'PENDING',
      requestedAt: nowTimestamp()
    };

    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'material_requests', id), req);
      } catch (err) {
        console.warn('Firestore requestMaterials fallback:', err);
      }
    }

    const items = getLocalItem<MaterialRequest[]>(STORAGE_KEYS.MATERIALS, INITIAL_MATERIAL_REQUESTS);
    items.unshift(req);
    setLocalItem(STORAGE_KEYS.MATERIALS, items);

    await this.logActivity(
      user.uid,
      user.name,
      'Site Material Requisition Submitted',
      `Requested ${req.items.length} items for "${req.projectName}" at ${req.siteLocation}.`,
      'MATERIALS'
    );

    return req;
  },

  async reviewMaterialRequest(requestId: string, status: RequestStatus, reviewNotes: string): Promise<void> {
    const admin = this.getCurrentUser();
    if (!admin || admin.role !== 'ADMIN') throw new Error('Unauthorized');

    const reviewedAt = nowTimestamp();

    if (isFirebaseConfigured && db) {
      try {
        await updateDoc(doc(db, 'material_requests', requestId), {
          status,
          reviewNotes,
          reviewedBy: admin.name,
          reviewedAt
        });
      } catch (err) {
        console.warn('Firestore reviewMaterialRequest fallback:', err);
      }
    }

    const items = getLocalItem<MaterialRequest[]>(STORAGE_KEYS.MATERIALS, INITIAL_MATERIAL_REQUESTS);
    const updated = items.map(m => {
      if (m.id === requestId) {
        return {
          ...m,
          status,
          reviewNotes,
          reviewedBy: admin.name,
          reviewedAt
        };
      }
      return m;
    });
    setLocalItem(STORAGE_KEYS.MATERIALS, updated);

    await this.logActivity(
      admin.uid,
      admin.name,
      `Material Requisition ${status}`,
      `Material request ${requestId} marked as ${status}.`,
      'MATERIALS'
    );
  },

  // ==========================================
  // FIELD EXPENSES & PER DIEM (Food, Sleep, Transport, Receipts)
  // ==========================================
  async getFieldExpenses(workerUid?: string): Promise<FieldExpense[]> {
    if (isFirebaseConfigured && db) {
      try {
        let q;
        if (workerUid) {
          q = query(collection(db, 'field_expenses'), where('workerUid', '==', workerUid));
        } else {
          q = query(collection(db, 'field_expenses'));
        }
        const snap = await getDocs(q);
        const list: FieldExpense[] = [];
        snap.forEach(d => list.push({ ...d.data(), id: d.id } as FieldExpense));
        if (list.length > 0) return list;
      } catch (err) {
        console.warn('Firestore getFieldExpenses fallback:', err);
      }
    }

    const items = getLocalItem<FieldExpense[]>(STORAGE_KEYS.EXPENSES, INITIAL_FIELD_EXPENSES);
    if (workerUid) {
      return items.filter(e => e.workerUid === workerUid);
    }
    return items;
  },

  async submitFieldExpense(data: Omit<FieldExpense, 'id' | 'workerUid' | 'workerName' | 'employeeId' | 'status' | 'submittedAt'>): Promise<FieldExpense> {
    const user = this.getCurrentUser();
    if (!user) throw new Error('Must be signed in.');

    const id = 'EXP-REQ-' + Date.now().toString().slice(-5);
    const exp: FieldExpense = {
      ...data,
      id,
      workerUid: user.uid,
      workerName: user.name,
      employeeId: user.employeeId,
      status: 'PENDING',
      submittedAt: nowTimestamp()
    };

    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'field_expenses', id), exp);
      } catch (err) {
        console.warn('Firestore submitFieldExpense fallback:', err);
      }
    }

    const items = getLocalItem<FieldExpense[]>(STORAGE_KEYS.EXPENSES, INITIAL_FIELD_EXPENSES);
    items.unshift(exp);
    setLocalItem(STORAGE_KEYS.EXPENSES, items);

    await this.logActivity(
      user.uid,
      user.name,
      'Field Expense Claim Submitted',
      `Submitted ${exp.category} for ${exp.amount.toLocaleString()} TZS at ${exp.destination}.`,
      'EXPENSE'
    );

    return exp;
  },

  async reviewFieldExpense(expenseId: string, status: RequestStatus, reviewNotes: string): Promise<void> {
    const admin = this.getCurrentUser();
    if (!admin || admin.role !== 'ADMIN') throw new Error('Unauthorized');

    const reviewedAt = nowTimestamp();

    if (isFirebaseConfigured && db) {
      try {
        await updateDoc(doc(db, 'field_expenses', expenseId), {
          status,
          reviewNotes,
          reviewedBy: admin.name,
          reviewedAt
        });
      } catch (err) {
        console.warn('Firestore reviewFieldExpense fallback:', err);
      }
    }

    const items = getLocalItem<FieldExpense[]>(STORAGE_KEYS.EXPENSES, INITIAL_FIELD_EXPENSES);
    const updated = items.map(e => {
      if (e.id === expenseId) {
        return {
          ...e,
          status,
          reviewNotes,
          reviewedBy: admin.name,
          reviewedAt
        };
      }
      return e;
    });
    setLocalItem(STORAGE_KEYS.EXPENSES, updated);

    await this.logActivity(
      admin.uid,
      admin.name,
      `Field Expense ${status}`,
      `Expense claim ${expenseId} marked as ${status}.`,
      'EXPENSE'
    );
  },

  // ==========================================
  // ACTIVITY AUDIT LOGS
  // ==========================================
  async getActivityLogs(): Promise<ActivityLog[]> {
    if (isFirebaseConfigured && db) {
      try {
        const q = query(collection(db, 'activity_logs'), orderBy('timestamp', 'desc'));
        const snap = await getDocs(q);
        const list: ActivityLog[] = [];
        snap.forEach(d => list.push({ ...d.data(), id: d.id } as ActivityLog));
        if (list.length > 0) return list;
      } catch (err) {
        console.warn('Firestore getActivityLogs fallback:', err);
      }
    }

    return getLocalItem<ActivityLog[]>(STORAGE_KEYS.LOGS, INITIAL_ACTIVITY_LOGS);
  },

  async logActivity(
    workerUid: string, 
    workerName: string, 
    action: string, 
    details: string, 
    category: ActivityLog['category']
  ): Promise<void> {
    const id = 'LOG-' + Date.now().toString().slice(-6);
    const log: ActivityLog = {
      id,
      workerUid,
      workerName,
      action,
      details,
      timestamp: nowTimestamp(),
      category
    };

    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'activity_logs', id), log);
      } catch (err) {
        console.warn('Firestore logActivity fallback:', err);
      }
    }

    const logs = getLocalItem<ActivityLog[]>(STORAGE_KEYS.LOGS, INITIAL_ACTIVITY_LOGS);
    logs.unshift(log);
    if (logs.length > 150) logs.pop();
    setLocalItem(STORAGE_KEYS.LOGS, logs);
  }
};
