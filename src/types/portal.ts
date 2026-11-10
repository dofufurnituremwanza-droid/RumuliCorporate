export type UserRole = 'ADMIN' | 'WORKER';

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE';

export interface UserProfile {
  uid: string;
  employeeId: string; // e.g. RUM-ADM-001, RUM-ENG-104
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  department: string;
  designation: string;
  baseSalary: number; // in TZS
  status: UserStatus;
  joinedDate: string;
  avatarUrl?: string;
}

export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD';

export interface WorkerTask {
  id: string;
  title: string;
  project: string;
  location: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignedToUid: string;
  assignedToName: string;
  assignedBy: string;
  deadline: string;
  description: string;
  completionNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export type RequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'DISBURSED';

export interface EarlySalaryRequest {
  id: string;
  workerUid: string;
  workerName: string;
  employeeId: string;
  department: string;
  requestedAmount: number; // TZS
  currentSalary: number; // TZS
  reason: string;
  repaymentTerms: string;
  status: RequestStatus;
  requestedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  reviewNotes?: string;
}

export interface MaterialItem {
  item: string;
  quantity: number;
  unit: string; // e.g., meters, drums, bags, pcs, units
  purpose: string;
}

export interface MaterialRequest {
  id: string;
  workerUid: string;
  workerName: string;
  employeeId: string;
  projectName: string;
  siteLocation: string;
  urgency: 'NORMAL' | 'URGENT';
  items: MaterialItem[];
  justification: string;
  status: RequestStatus;
  requestedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  reviewNotes?: string;
}

export type ExpenseCategory = 
  | 'FOOD_PER_DIEM'        // Food & meal allowance on far field sites
  | 'ACCOMMODATION_SLEEP'   // Lodge / accommodation when working far
  | 'TRAVEL_TRANSPORT'     // Bus / train / vehicle transit fare
  | 'FUEL_ALLOWANCE'       // Vehicle / generator fuel
  | 'EMERGENCY_MATERIALS'  // Local site consumable purchases
  | 'OTHER_EXPENDITURE';

export interface FieldExpense {
  id: string;
  workerUid: string;
  workerName: string;
  employeeId: string;
  category: ExpenseCategory;
  destination: string;
  daysCount?: number;
  amount: number; // TZS
  description: string;
  receiptDataUrl?: string;
  receiptFileName?: string;
  status: RequestStatus;
  submittedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  reviewNotes?: string;
}

export interface ActivityLog {
  id: string;
  workerUid: string;
  workerName: string;
  action: string;
  details: string;
  timestamp: string;
  category: 'AUTH' | 'TASK' | 'SALARY' | 'MATERIALS' | 'EXPENSE' | 'ADMIN';
}

