export type UserRole = 'ADMIN' | 'ASSISTANT' | 'WORKER';

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE';

export interface UserProfile {
  uid: string;
  employeeId: string; // e.g. RUM-ADM-001, RUM-AST-010, RUM-ENG-104
  name: string;
  email: string;
  password?: string; // Created and managed by Admin
  phone: string;
  role: UserRole;
  department: string;
  designation: string;
  baseSalary?: number; // Optional - Admin does not assign salary
  status: UserStatus;
  joinedDate: string;
  avatarUrl?: string; // User/Admin profile photo attachment
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
  unit: string; // e.g. Meters, Drums, Bags, Sets, Pieces
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
  | 'FOOD_PER_DIEM'        // Daily food subsistence allowance on far work sites
  | 'ACCOMMODATION_SLEEP'   // Lodge / hotel accommodation invoice when working far
  | 'TRAVEL_TRANSPORT'     // Long-distance bus/vehicle transit fare
  | 'FUEL_ALLOWANCE'       // Fleet / generator fuel
  | 'EMERGENCY_MATERIALS'  // Emergency site purchases
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
  receiptDataUrl?: string; // Uploaded receipt image/document
  receiptFileName?: string;
  status: RequestStatus;
  submittedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  reviewNotes?: string;
}

// Project Field Execution Report submitted by workers
export interface ProjectReport {
  id: string;
  workerUid: string;
  workerName: string;
  employeeId: string;
  projectTitle: string;
  siteLocation: string;
  reportDate: string;
  workCompleted: string;
  technicalChallenges?: string;
  weatherHseConditions?: string;
  equipmentUsed?: string;
  photos: Array<{ name: string; url: string }>;
  status: 'SUBMITTED' | 'REVIEWED' | 'ACTION_REQUIRED';
  submittedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  reviewNotes?: string;
}

// Daily HSE Toolbox & Live-Line Safety Sign-off
export interface SafetySignOff {
  id: string;
  workerUid: string;
  workerName: string;
  date: string;
  siteLocation: string;
  workScope: string;
  ppeInspected: boolean;
  isolationPermitVerified: boolean;
  earthingMatVerified: boolean;
  emergencyPlanReviewed: boolean;
  signedAt: string;
}

export interface ActivityLog {
  id: string;
  workerUid: string;
  workerName: string;
  action: string;
  details: string;
  timestamp: string;
  category: 'AUTH' | 'TASK' | 'SALARY' | 'MATERIALS' | 'EXPENSE' | 'REPORT' | 'ADMIN';
}
