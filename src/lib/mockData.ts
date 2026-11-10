import { UserProfile, WorkerTask, EarlySalaryRequest, MaterialRequest, FieldExpense, ProjectReport, ActivityLog } from '../types/portal';

// Master Administrator Account requested by User:
// Email: admin@rumuli.com
// Password: rumuli2026
export const INITIAL_USERS: UserProfile[] = [
  {
    uid: 'admin-master',
    employeeId: 'RUM-ADM-001',
    name: 'Executive Management',
    email: 'admin@rumuli.com',
    password: 'rumuli2026',
    phone: '+255 784 123 456',
    role: 'ADMIN',
    department: 'Corporate Technical Directorate',
    designation: 'Managing Director & Principal Executive Engineer',
    baseSalary: 7500000,
    status: 'ACTIVE',
    joinedDate: '2026-01-01',
    avatarUrl: ''
  }
];

// Clean empty operational state - No fake demo data
export const INITIAL_TASKS: WorkerTask[] = [];
export const INITIAL_SALARY_REQUESTS: EarlySalaryRequest[] = [];
export const INITIAL_MATERIAL_REQUESTS: MaterialRequest[] = [];
export const INITIAL_FIELD_EXPENSES: FieldExpense[] = [];
export const INITIAL_PROJECT_REPORTS: ProjectReport[] = [];

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [];
