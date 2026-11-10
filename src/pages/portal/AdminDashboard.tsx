import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PortalHeader } from '../../components/portal/PortalHeader';
import { PortalService } from '../../services/portalService';
import { 
  UserProfile,
  WorkerTask, 
  EarlySalaryRequest, 
  MaterialRequest, 
  FieldExpense, 
  ActivityLog,
  ProjectReport,
  TaskPriority,
  RequestStatus
} from '../../types/portal';
import { 
  ShieldCheck, 
  Users, 
  CheckSquare, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  DollarSign, 
  Package, 
  Receipt, 
  FileText, 
  MapPin, 
  Calendar, 
  Eye, 
  X, 
  History, 
  Briefcase, 
  UserPlus,
  Camera,
  Key,
  Image as ImageIcon
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { currentUser, isAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState<'approvals' | 'tasks' | 'reports' | 'workers' | 'audit'>('approvals');
  const [approvalCategory, setApprovalCategory] = useState<'all' | 'salary' | 'expenses' | 'materials'>('all');

  const [workers, setWorkers] = useState<UserProfile[]>([]);
  const [tasks, setTasks] = useState<WorkerTask[]>([]);
  const [salaryRequests, setSalaryRequests] = useState<EarlySalaryRequest[]>([]);
  const [materialRequests, setMaterialRequests] = useState<MaterialRequest[]>([]);
  const [expenses, setExpenses] = useState<FieldExpense[]>([]);
  const [projectReports, setProjectReports] = useState<ProjectReport[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [showAssignTaskModal, setShowAssignTaskModal] = useState(false);
  const [showCreateWorkerModal, setShowCreateWorkerModal] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Review modal state for approvals
  const [reviewItem, setReviewItem] = useState<{
    type: 'SALARY' | 'EXPENSE' | 'MATERIAL';
    id: string;
    title: string;
    amount?: number;
    worker: string;
    action: RequestStatus;
  } | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');

  // Review modal state for project reports
  const [reportReviewModal, setReportReviewModal] = useState<{
    reportId: string;
    projectTitle: string;
    workerName: string;
  } | null>(null);
  const [reportReviewNotes, setReportReviewNotes] = useState('');

  // Form states for Assign Task
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskWorkerUid, setNewTaskWorkerUid] = useState('');
  const [newTaskProject, setNewTaskProject] = useState('');
  const [newTaskLocation, setNewTaskLocation] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<TaskPriority>('HIGH');
  const [newTaskDeadline, setNewTaskDeadline] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  // Form states for Provision Worker (with Admin-set password & profile photo)
  const [newWorkerName, setNewWorkerName] = useState('');
  const [newWorkerEmpId, setNewWorkerEmpId] = useState('');
  const [newWorkerEmail, setNewWorkerEmail] = useState('');
  const [newWorkerPassword, setNewWorkerPassword] = useState('rumuli2026');
  const [newWorkerAvatar, setNewWorkerAvatar] = useState('');
  const [newWorkerPhone, setNewWorkerPhone] = useState('');
  const [newWorkerRole, setNewWorkerRole] = useState<'WORKER' | 'ADMIN'>('WORKER');
  const [newWorkerDept, setNewWorkerDept] = useState('Substations & Live-Line Power');
  const [newWorkerDesignation, setNewWorkerDesignation] = useState('');
  const [newWorkerSalary, setNewWorkerSalary] = useState<number>(2500000);

  // Load all company data
  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [w, t, s, m, e, r, l] = await Promise.all([
        PortalService.getWorkers(),
        PortalService.getTasks(),
        PortalService.getSalaryRequests(),
        PortalService.getMaterialRequests(),
        PortalService.getFieldExpenses(),
        PortalService.getProjectReports(),
        PortalService.getActivityLogs()
      ]);
      setWorkers(w);
      setTasks(t);
      setSalaryRequests(s);
      setMaterialRequests(m);
      setExpenses(e);
      setProjectReports(r);
      setActivityLogs(l);

      if (w.length > 0 && !newTaskWorkerUid) {
        const firstWorker = w.find(u => u.role === 'WORKER') || w[0];
        setNewTaskWorkerUid(firstWorker.uid);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  if (!currentUser || !isAdmin) {
    return (
      <div className="min-h-screen bg-[#F4F5F6] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-6 sm:p-8 rounded-lg border border-red-200 max-w-md w-full text-center shadow-lg">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-3" />
          <h2 className="text-base sm:text-lg font-bold text-gray-900">Administrative Access Required</h2>
          <p className="text-xs text-gray-600 mt-2">
            This dashboard is restricted strictly to Corporate Executive Management and Administrators.
          </p>
        </div>
      </div>
    );
  }

  // Count pending items
  const pendingSalaryCount = salaryRequests.filter(s => s.status === 'PENDING').length;
  const pendingExpensesCount = expenses.filter(e => e.status === 'PENDING').length;
  const pendingMaterialsCount = materialRequests.filter(m => m.status === 'PENDING').length;
  const totalPending = pendingSalaryCount + pendingExpensesCount + pendingMaterialsCount;
  const submittedReportsCount = projectReports.filter(r => r.status === 'SUBMITTED').length;

  // Execute Review (Approve / Reject) for Salary, Expenses, Materials
  const handleExecuteReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewItem) return;

    if (reviewItem.type === 'SALARY') {
      await PortalService.reviewSalaryRequest(reviewItem.id, reviewItem.action, reviewNotes || `${reviewItem.action} by Corporate Executive.`);
    } else if (reviewItem.type === 'EXPENSE') {
      await PortalService.reviewFieldExpense(reviewItem.id, reviewItem.action, reviewNotes || `${reviewItem.action} by Corporate Executive.`);
    } else if (reviewItem.type === 'MATERIAL') {
      await PortalService.reviewMaterialRequest(reviewItem.id, reviewItem.action, reviewNotes || `${reviewItem.action} by Corporate Executive.`);
    }

    setReviewItem(null);
    setReviewNotes('');
    await loadAdminData();
  };

  // Review Field Project Report
  const handleReviewProjectReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportReviewModal) return;

    await PortalService.reviewProjectReport(
      reportReviewModal.reportId,
      'REVIEWED',
      reportReviewNotes || 'Verified and approved by Executive Engineering Management.'
    );

    setReportReviewModal(null);
    setReportReviewNotes('');
    await loadAdminData();
  };

  // Assign Task Handler
  const handleAssignTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const assignedWorker = workers.find(w => w.uid === newTaskWorkerUid);
    if (!assignedWorker) return;

    await PortalService.createTask({
      title: newTaskTitle,
      project: newTaskProject,
      location: newTaskLocation,
      priority: newTaskPriority,
      status: 'PENDING',
      assignedToUid: assignedWorker.uid,
      assignedToName: assignedWorker.name,
      assignedBy: currentUser.name,
      deadline: newTaskDeadline || '2026-11-25',
      description: newTaskDescription
    });

    setShowAssignTaskModal(false);
    setNewTaskTitle('');
    setNewTaskProject('');
    setNewTaskLocation('');
    setNewTaskDescription('');
    await loadAdminData();
  };

  // Image Upload for Worker Provisioning
  const handleWorkerPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewWorkerAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Provision Worker Handler (Admin sets password & photo)
  const handleProvisionWorker = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorkerName || !newWorkerEmail || !newWorkerPassword) return;

    const empId = newWorkerEmpId || `RUM-EMP-${Math.floor(100 + Math.random() * 900)}`;

    await PortalService.createWorker({
      employeeId: empId,
      name: newWorkerName,
      email: newWorkerEmail,
      password: newWorkerPassword,
      avatarUrl: newWorkerAvatar,
      phone: newWorkerPhone || '+255 700 000 000',
      role: newWorkerRole,
      department: newWorkerDept,
      designation: newWorkerDesignation || 'Engineering Technician',
      baseSalary: Number(newWorkerSalary),
      status: 'ACTIVE',
      joinedDate: new Date().toISOString().split('T')[0]
    });

    setShowCreateWorkerModal(false);
    setNewWorkerName('');
    setNewWorkerEmpId('');
    setNewWorkerEmail('');
    setNewWorkerPassword('rumuli2026');
    setNewWorkerAvatar('');
    setNewWorkerPhone('');
    setNewWorkerDesignation('');
    await loadAdminData();
  };

  // Toggle Worker Status
  const handleToggleWorkerStatus = async (worker: UserProfile) => {
    const nextStatus = worker.status === 'ACTIVE' ? 'ON_LEAVE' : (worker.status === 'ON_LEAVE' ? 'INACTIVE' : 'ACTIVE');
    await PortalService.updateWorkerStatus(worker.uid, nextStatus);
    await loadAdminData();
  };

  return (
    <div className="min-h-screen bg-[#F4F5F6] flex flex-col">
      <PortalHeader />

      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-5 sm:py-8">
        
        {/* Admin Header Banner */}
        <div className="bg-[#10243A] text-white rounded-lg p-4 sm:p-6 md:p-8 shadow-md mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-amber-brand flex-shrink-0" />
                <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-widest text-amber-brand">
                  Executive Administration & Operations Command
                </span>
              </div>
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight mt-1">
                Corporate Command Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl leading-relaxed">
                Authorized management center to provision staff accounts and assign passwords, dispatch high-voltage and mining field tasks, inspect submitted project field reports, and authorize salary advances & field expenditures.
              </p>
            </div>

            {/* Quick Actions (Full width on mobile, inline on desktop) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto flex-shrink-0">
              <button
                type="button"
                onClick={() => setShowAssignTaskModal(true)}
                className="w-full sm:w-auto px-4 py-2.5 bg-amber-brand hover:bg-amber-hover text-[#10243A] text-xs font-bold rounded flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Assign Field Task</span>
              </button>
              <button
                type="button"
                onClick={() => setShowCreateWorkerModal(true)}
                className="w-full sm:w-auto px-4 py-2.5 bg-[#1C3E61] text-white hover:bg-[#234d77] border border-[#2B5480] text-xs font-bold rounded flex items-center justify-center space-x-1.5 transition-colors"
              >
                <UserPlus className="w-4 h-4 text-amber-brand" />
                <span>+ Provision Worker Account</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Cards (Responsive grid) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 mt-5 pt-5 border-t border-[#1C3E61]">
            <div className="bg-[#16314D]/80 p-2.5 sm:p-3 rounded border border-[#203D5C]">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-400 block truncate">Pending Approvals</span>
              <div className="text-base sm:text-lg font-black text-amber-brand mt-0.5 flex items-center space-x-1">
                <span>{totalPending}</span>
                {totalPending > 0 && <span className="text-[9px] font-semibold bg-red-500/20 text-red-300 px-1 py-0.2 rounded">Action</span>}
              </div>
            </div>

            <div className="bg-[#16314D]/80 p-2.5 sm:p-3 rounded border border-[#203D5C]">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-400 block truncate">Field Reports</span>
              <div className="text-base sm:text-lg font-black text-amber-brand mt-0.5">
                <span>{projectReports.length}</span>
                {submittedReportsCount > 0 && <span className="ml-1 text-[9px] font-semibold text-emerald-400">({submittedReportsCount} New)</span>}
              </div>
            </div>

            <div className="bg-[#16314D]/80 p-2.5 sm:p-3 rounded border border-[#203D5C]">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-400 block truncate">Staff Personnel</span>
              <div className="text-base sm:text-lg font-black text-white mt-0.5 truncate">{workers.length} Members</div>
            </div>

            <div className="bg-[#16314D]/80 p-2.5 sm:p-3 rounded border border-[#203D5C]">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-400 block truncate">Active Tasks</span>
              <div className="text-base sm:text-lg font-black text-blue-400 mt-0.5 truncate">{tasks.length} Assigned</div>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-[#16314D]/80 p-2.5 sm:p-3 rounded border border-[#203D5C]">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-400 block truncate">Audit Events</span>
              <div className="text-base sm:text-lg font-black text-emerald-400 mt-0.5">{activityLogs.length} Logged</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs (Horizontal scroll with touch support on phone) */}
        <div className="flex border-b border-gray-200 bg-white rounded-t-lg px-2 sm:px-4 shadow-2xs mb-6 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('approvals')}
            className={`py-3 px-3 sm:px-4 font-bold text-[11px] sm:text-xs uppercase tracking-wider border-b-2 transition-colors flex items-center space-x-1.5 whitespace-nowrap flex-shrink-0 ${
              activeTab === 'approvals'
                ? 'border-amber-brand text-[#10243A]'
                : 'border-transparent text-gray-500 hover:text-[#10243A]'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-brand" />
            <span>Approvals</span>
            {totalPending > 0 && (
              <span className="px-1.5 py-0.2 text-[9px] font-extrabold bg-red-600 text-white rounded-full">
                {totalPending}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('reports')}
            className={`py-3 px-3 sm:px-4 font-bold text-[11px] sm:text-xs uppercase tracking-wider border-b-2 transition-colors flex items-center space-x-1.5 whitespace-nowrap flex-shrink-0 ${
              activeTab === 'reports'
                ? 'border-amber-brand text-[#10243A]'
                : 'border-transparent text-gray-500 hover:text-[#10243A]'
            }`}
          >
            <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-brand" />
            <span>Project Reports</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[9px] bg-amber-100 text-amber-900 font-bold">{projectReports.length}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tasks')}
            className={`py-3 px-3 sm:px-4 font-bold text-[11px] sm:text-xs uppercase tracking-wider border-b-2 transition-colors flex items-center space-x-1.5 whitespace-nowrap flex-shrink-0 ${
              activeTab === 'tasks'
                ? 'border-amber-brand text-[#10243A]'
                : 'border-transparent text-gray-500 hover:text-[#10243A]'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
            <span>Task Board</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[9px] bg-gray-100 font-bold">{tasks.length}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('workers')}
            className={`py-3 px-3 sm:px-4 font-bold text-[11px] sm:text-xs uppercase tracking-wider border-b-2 transition-colors flex items-center space-x-1.5 whitespace-nowrap flex-shrink-0 ${
              activeTab === 'workers'
                ? 'border-amber-brand text-[#10243A]'
                : 'border-transparent text-gray-500 hover:text-[#10243A]'
            }`}
          >
            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
            <span>Staff Roster</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[9px] bg-gray-100 font-bold">{workers.length}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('audit')}
            className={`py-3 px-3 sm:px-4 font-bold text-[11px] sm:text-xs uppercase tracking-wider border-b-2 transition-colors flex items-center space-x-1.5 whitespace-nowrap flex-shrink-0 ${
              activeTab === 'audit'
                ? 'border-amber-brand text-[#10243A]'
                : 'border-transparent text-gray-500 hover:text-[#10243A]'
            }`}
          >
            <History className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600" />
            <span>Audit Trail</span>
          </button>
        </div>

        {/* ============================================================ */}
        {/* TAB 1: APPROVALS NERVE CENTER */}
        {/* ============================================================ */}
        {activeTab === 'approvals' && (
          <div className="space-y-6">
            
            {/* Filter Pills */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-1">
              <span className="text-[11px] sm:text-xs font-bold uppercase text-gray-500 whitespace-nowrap">Filter:</span>
              <button
                type="button"
                onClick={() => setApprovalCategory('all')}
                className={`px-2.5 py-1 rounded text-xs font-semibold whitespace-nowrap ${
                  approvalCategory === 'all' ? 'bg-[#10243A] text-white' : 'bg-white border text-gray-600'
                }`}
              >
                All ({salaryRequests.length + expenses.length + materialRequests.length})
              </button>
              <button
                type="button"
                onClick={() => setApprovalCategory('salary')}
                className={`px-2.5 py-1 rounded text-xs font-semibold whitespace-nowrap ${
                  approvalCategory === 'salary' ? 'bg-[#10243A] text-white' : 'bg-white border text-gray-600'
                }`}
              >
                Salary Advances ({salaryRequests.length})
              </button>
              <button
                type="button"
                onClick={() => setApprovalCategory('expenses')}
                className={`px-2.5 py-1 rounded text-xs font-semibold whitespace-nowrap ${
                  approvalCategory === 'expenses' ? 'bg-[#10243A] text-white' : 'bg-white border text-gray-600'
                }`}
              >
                Field Expenses ({expenses.length})
              </button>
              <button
                type="button"
                onClick={() => setApprovalCategory('materials')}
                className={`px-2.5 py-1 rounded text-xs font-semibold whitespace-nowrap ${
                  approvalCategory === 'materials' ? 'bg-[#10243A] text-white' : 'bg-white border text-gray-600'
                }`}
              >
                Material Requisitions ({materialRequests.length})
              </button>
            </div>

            {/* SECTION: EARLY SALARY REQUESTS */}
            {(approvalCategory === 'all' || approvalCategory === 'salary') && (
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-2xs">
                <div className="px-4 sm:px-5 py-3 bg-emerald-50/50 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700 flex-shrink-0" />
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-[#10243A]">Early Salary Payout Requests</h3>
                      <p className="text-[10px] sm:text-[11px] text-gray-500 hidden sm:block">Staff advance requests pending executive approval and payroll authorization.</p>
                    </div>
                  </div>
                  {pendingSalaryCount > 0 && (
                    <span className="px-2 py-0.5 text-[10px] sm:text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 rounded">
                      {pendingSalaryCount} Pending
                    </span>
                  )}
                </div>

                <div className="divide-y divide-gray-100">
                  {salaryRequests.length === 0 ? (
                    <div className="p-6 sm:p-8 text-center text-xs text-gray-500">No salary advance requests recorded.</div>
                  ) : (
                    salaryRequests.map((req) => (
                      <div key={req.id} className="p-3.5 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 hover:bg-gray-50/80 transition-colors">
                        <div className="space-y-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="font-mono text-[10px] sm:text-xs font-bold text-gray-500">{req.id}</span>
                            <span className="font-bold text-xs sm:text-sm text-[#10243A]">{req.workerName}</span>
                            <span className="text-[10px] font-mono text-gray-500">({req.employeeId})</span>
                            <span className="text-[11px] text-gray-400">• {req.department}</span>
                          </div>

                          <div className="flex flex-wrap items-baseline gap-2 text-xs">
                            <span className="font-black text-emerald-700 text-sm sm:text-base">
                              {req.requestedAmount.toLocaleString()} TZS
                            </span>
                            <span className="text-gray-400 font-mono text-[11px]">
                              (Base: {req.currentSalary.toLocaleString()} TZS)
                            </span>
                          </div>

                          <p className="text-xs text-gray-700 max-w-xl break-words">
                            <strong>Reason:</strong> {req.reason}
                          </p>
                          <p className="text-[10px] sm:text-[11px] text-gray-500">
                            <strong>Plan:</strong> {req.repaymentTerms} • Filed {req.requestedAt}
                          </p>
                          {req.reviewNotes && (
                            <div className="text-xs text-blue-800 bg-blue-50 p-1.5 rounded max-w-lg mt-1 break-words">
                              <strong>Decision:</strong> {req.reviewNotes} ({req.reviewedBy})
                            </div>
                          )}
                        </div>

                        {/* Actions (Stacked or Full Width on Phone) */}
                        <div className="flex items-center gap-2 w-full md:w-auto flex-shrink-0 pt-2 md:pt-0">
                          {req.status === 'PENDING' ? (
                            <>
                              <button
                                type="button"
                                onClick={() => {
                                  setReviewItem({
                                    type: 'SALARY',
                                    id: req.id,
                                    title: `Advance of ${req.requestedAmount.toLocaleString()} TZS`,
                                    amount: req.requestedAmount,
                                    worker: req.workerName,
                                    action: 'APPROVED'
                                  });
                                  setReviewNotes(`Authorized for payroll release. Repayment terms: ${req.repaymentTerms}`);
                                }}
                                className="flex-1 md:flex-initial justify-center px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold flex items-center space-x-1 transition-colors shadow-2xs"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Approve</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setReviewItem({
                                    type: 'SALARY',
                                    id: req.id,
                                    title: `Advance of ${req.requestedAmount.toLocaleString()} TZS`,
                                    amount: req.requestedAmount,
                                    worker: req.workerName,
                                    action: 'REJECTED'
                                  });
                                  setReviewNotes('Salary advance limit reached or policy requirements not met.');
                                }}
                                className="flex-1 md:flex-initial justify-center px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-800 rounded text-xs font-bold transition-colors"
                              >
                                <span>Reject</span>
                              </button>
                            </>
                          ) : (
                            <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                              req.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {req.status}
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* SECTION: FIELD EXPENSES, MEALS, LODGING & RECEIPTS */}
            {(approvalCategory === 'all' || approvalCategory === 'expenses') && (
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-2xs">
                <div className="px-4 sm:px-5 py-3 bg-amber-50/50 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Receipt className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700 flex-shrink-0" />
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-[#10243A]">Field Per Diem, Meals, Lodging & Expenses</h3>
                      <p className="text-[10px] sm:text-[11px] text-gray-500 hidden sm:block">Expenditures filed by engineers dispatched to far projects (food, hotel, fuel).</p>
                    </div>
                  </div>
                  {pendingExpensesCount > 0 && (
                    <span className="px-2 py-0.5 text-[10px] sm:text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 rounded">
                      {pendingExpensesCount} Pending
                    </span>
                  )}
                </div>

                <div className="divide-y divide-gray-100">
                  {expenses.length === 0 ? (
                    <div className="p-6 sm:p-8 text-center text-xs text-gray-500">No field expense claims recorded.</div>
                  ) : (
                    expenses.map((exp) => (
                      <div key={exp.id} className="p-3.5 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 hover:bg-gray-50/80 transition-colors">
                        <div className="space-y-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="font-mono text-[10px] sm:text-xs font-bold text-gray-500">{exp.id}</span>
                            <span className="font-bold text-xs sm:text-sm text-[#10243A]">{exp.workerName}</span>
                            <span className="text-[10px] font-mono text-gray-500">({exp.employeeId})</span>
                            <span className="text-xs font-bold text-amber-brand">
                              [{exp.category.replace(/_/g, ' ')}]
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            <span className="font-black text-[#10243A] text-sm sm:text-base">
                              {exp.amount.toLocaleString()} TZS
                            </span>
                            <span className="text-gray-500 flex items-center space-x-1 text-[11px]">
                              <MapPin className="w-3.5 h-3.5 text-amber-brand flex-shrink-0" />
                              <span className="truncate">{exp.destination}</span>
                            </span>
                            {exp.daysCount && (
                              <span className="text-gray-400 text-[11px]">({exp.daysCount} Days)</span>
                            )}
                          </div>

                          <p className="text-xs text-gray-700 max-w-xl break-words">{exp.description}</p>

                          {/* Attached Receipt Link */}
                          {exp.receiptDataUrl && (
                            <div className="flex flex-wrap items-center gap-1.5 pt-1">
                              <span className="text-[11px] text-gray-500 font-semibold">Receipt:</span>
                              <button
                                type="button"
                                onClick={() => setPreviewImage(exp.receiptDataUrl || null)}
                                className="inline-flex items-center space-x-1 px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded text-xs font-semibold hover:bg-blue-100 transition-colors"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Inspect Receipt ({exp.receiptFileName || 'Document'})</span>
                              </button>
                            </div>
                          )}

                          {exp.reviewNotes && (
                            <div className="text-xs text-blue-800 bg-blue-50 p-1.5 rounded max-w-lg mt-1 break-words">
                              <strong>Decision:</strong> {exp.reviewNotes} ({exp.reviewedBy})
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 w-full md:w-auto flex-shrink-0 pt-2 md:pt-0">
                          {exp.status === 'PENDING' ? (
                            <>
                              <button
                                type="button"
                                onClick={() => {
                                  setReviewItem({
                                    type: 'EXPENSE',
                                    id: exp.id,
                                    title: `${exp.category.replace(/_/g, ' ')} (${exp.amount.toLocaleString()} TZS)`,
                                    amount: exp.amount,
                                    worker: exp.workerName,
                                    action: 'APPROVED'
                                  });
                                  setReviewNotes(`Reimbursement verified against field mobilization log. Disbursed.`);
                                }}
                                className="flex-1 md:flex-initial justify-center px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold flex items-center space-x-1 transition-colors shadow-2xs"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Approve</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setReviewItem({
                                    type: 'EXPENSE',
                                    id: exp.id,
                                    title: `${exp.category.replace(/_/g, ' ')} (${exp.amount.toLocaleString()} TZS)`,
                                    amount: exp.amount,
                                    worker: exp.workerName,
                                    action: 'REJECTED'
                                  });
                                  setReviewNotes('Receipt illegible or expenditure outside travel authorization.');
                                }}
                                className="flex-1 md:flex-initial justify-center px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-800 rounded text-xs font-bold transition-colors"
                              >
                                <span>Reject</span>
                              </button>
                            </>
                          ) : (
                            <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                              exp.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {exp.status}
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* SECTION: MATERIAL REQUISITIONS */}
            {(approvalCategory === 'all' || approvalCategory === 'materials') && (
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-2xs">
                <div className="px-4 sm:px-5 py-3 bg-blue-50/50 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4 sm:w-5 sm:h-5 text-blue-700 flex-shrink-0" />
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-[#10243A]">Worksite Material Requisitions</h3>
                      <p className="text-[10px] sm:text-[11px] text-gray-500 hidden sm:block">Conductors, transformers, switchgear, rigging tackle requested for sites.</p>
                    </div>
                  </div>
                  {pendingMaterialsCount > 0 && (
                    <span className="px-2 py-0.5 text-[10px] sm:text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 rounded">
                      {pendingMaterialsCount} Pending
                    </span>
                  )}
                </div>

                <div className="divide-y divide-gray-100">
                  {materialRequests.length === 0 ? (
                    <div className="p-6 sm:p-8 text-center text-xs text-gray-500">No material requisitions recorded.</div>
                  ) : (
                    materialRequests.map((mat) => (
                      <div key={mat.id} className="p-3.5 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 hover:bg-gray-50/80 transition-colors">
                        <div className="space-y-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="font-mono text-[10px] sm:text-xs font-bold text-gray-500">{mat.id}</span>
                            <span className="font-bold text-xs sm:text-sm text-[#10243A]">{mat.workerName}</span>
                            <span className="text-xs text-gray-500">• {mat.projectName}</span>
                            {mat.urgency === 'URGENT' && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-red-100 text-red-800 border border-red-300">
                                URGENT
                              </span>
                            )}
                          </div>

                          <div className="text-xs text-gray-600 flex items-center space-x-1">
                            <MapPin className="w-3.5 h-3.5 text-amber-brand flex-shrink-0" />
                            <span className="truncate">Destination: <strong>{mat.siteLocation}</strong></span>
                          </div>

                          {/* Itemized List */}
                          <div className="p-2.5 bg-gray-50 rounded border border-gray-100 text-xs mt-2 max-w-xl">
                            <strong className="block text-[10px] text-gray-500 uppercase">Items:</strong>
                            <ul className="list-disc list-inside space-y-0.5 mt-1 text-gray-700">
                              {mat.items.map((it, idx) => (
                                <li key={idx} className="break-words">
                                  <strong>{it.quantity} {it.unit}</strong> — {it.item} {it.purpose ? `(${it.purpose})` : ''}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <p className="text-xs text-gray-600 mt-1 italic break-words">"{mat.justification}"</p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 w-full md:w-auto flex-shrink-0 pt-2 md:pt-0">
                          {mat.status === 'PENDING' ? (
                            <>
                              <button
                                type="button"
                                onClick={() => {
                                  setReviewItem({
                                    type: 'MATERIAL',
                                    id: mat.id,
                                    title: `Material Dispatch for ${mat.projectName}`,
                                    worker: mat.workerName,
                                    action: 'APPROVED'
                                  });
                                  setReviewNotes('Approved. Dispatched from Rumuli central warehouse.');
                                }}
                                className="flex-1 md:flex-initial justify-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-bold flex items-center space-x-1 transition-colors shadow-2xs"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Authorize</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setReviewItem({
                                    type: 'MATERIAL',
                                    id: mat.id,
                                    title: `Material Dispatch for ${mat.projectName}`,
                                    worker: mat.workerName,
                                    action: 'REJECTED'
                                  });
                                  setReviewNotes('Items unavailable or request needs engineering re-specification.');
                                }}
                                className="flex-1 md:flex-initial justify-center px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-800 rounded text-xs font-bold transition-colors"
                              >
                                <span>Reject</span>
                              </button>
                            </>
                          ) : (
                            <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                              mat.status === 'APPROVED' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {mat.status}
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: FIELD PROJECT REPORTS REVIEW */}
        {/* ============================================================ */}
        {activeTab === 'reports' && (
          <div className="space-y-5">
            <div className="bg-white p-4 sm:p-5 rounded-lg border border-gray-200 shadow-2xs">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-amber-brand flex-shrink-0" />
                <h2 className="text-sm sm:text-base font-bold text-[#10243A]">Field Project Execution Reports</h2>
              </div>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Inspect technical progress reports filed by engineers from live substations, mining plants, and transmission lines, including audited on-site photographic evidence.
              </p>
            </div>

            {projectReports.length === 0 ? (
              <div className="bg-white p-8 sm:p-12 text-center rounded-lg border border-gray-200 shadow-2xs">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-sm font-bold text-gray-800">No Field Reports Submitted Yet</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
                  When field engineers and technicians submit work progress and photo attachments from their dashboard, they will appear here for executive engineering review.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {projectReports.map((report) => (
                  <div key={report.id} className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5 shadow-2xs space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-gray-100">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs font-bold text-amber-brand">{report.id}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            report.status === 'REVIEWED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {report.status}
                          </span>
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-[#10243A] mt-1 break-words">{report.projectTitle}</h3>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mt-1">
                          <span>By: <strong>{report.workerName}</strong> ({report.employeeId})</span>
                          <span>•</span>
                          <span className="flex items-center space-x-1">
                            <MapPin className="w-3.5 h-3.5 text-amber-brand flex-shrink-0" />
                            <span>{report.siteLocation}</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                            <span>{report.reportDate}</span>
                          </span>
                        </div>
                      </div>

                      {/* Review Action */}
                      <div className="w-full md:w-auto">
                        {report.status === 'SUBMITTED' ? (
                          <button
                            type="button"
                            onClick={() => {
                              setReportReviewModal({
                                reportId: report.id,
                                projectTitle: report.projectTitle,
                                workerName: report.workerName
                              });
                              setReportReviewNotes('Technical progress verified against project drawings and bill of quantities. Work authorized to proceed.');
                            }}
                            className="w-full md:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors shadow-2xs"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Review & Acknowledge</span>
                          </button>
                        ) : (
                          <div className="text-left md:text-right">
                            <span className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-700">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Acknowledged by {report.reviewedBy}</span>
                            </span>
                            {report.reviewNotes && (
                              <p className="text-[11px] text-gray-500 max-w-xs md:text-right mt-0.5 italic break-words">
                                "{report.reviewNotes}"
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Report Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs">
                      <div className="space-y-3">
                        <div className="p-3 bg-gray-50 rounded border border-gray-100">
                          <strong className="block text-[11px] uppercase tracking-wider text-gray-500 mb-1">
                            Engineering Work Completed:
                          </strong>
                          <p className="text-gray-800 leading-relaxed whitespace-pre-line break-words">{report.workCompleted}</p>
                        </div>

                        {report.technicalChallenges && (
                          <div className="p-3 bg-red-50/50 rounded border border-red-100">
                            <strong className="block text-[11px] uppercase tracking-wider text-red-700 mb-1">
                              Technical Challenges & Site Blockers:
                            </strong>
                            <p className="text-red-900 leading-relaxed break-words">{report.technicalChallenges}</p>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        {report.weatherHseConditions && (
                          <div className="p-3 bg-amber-50/40 rounded border border-amber-100">
                            <strong className="block text-[11px] uppercase tracking-wider text-amber-800 mb-1">
                              Weather & HSE Site Observations:
                            </strong>
                            <p className="text-gray-700 leading-relaxed break-words">{report.weatherHseConditions}</p>
                          </div>
                        )}

                        {report.equipmentUsed && (
                          <div className="p-3 bg-blue-50/40 rounded border border-blue-100">
                            <strong className="block text-[11px] uppercase tracking-wider text-blue-800 mb-1">
                              Machinery & Heavy Plant Deployed:
                            </strong>
                            <p className="text-gray-700 leading-relaxed break-words">{report.equipmentUsed}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Attached Site Photos */}
                    {report.photos && report.photos.length > 0 && (
                      <div className="pt-2 border-t border-gray-100">
                        <div className="flex items-center space-x-1.5 text-xs font-bold text-gray-700 mb-2">
                          <Camera className="w-4 h-4 text-amber-brand flex-shrink-0" />
                          <span>Attached On-Site Evidence ({report.photos.length} Photos) — Tap to enlarge</span>
                        </div>
                        <div className="flex flex-wrap gap-2.5">
                          {report.photos.map((photo, pIdx) => (
                            <button
                              key={pIdx}
                              type="button"
                              onClick={() => setPreviewImage(photo.url)}
                              className="group relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border border-gray-200 bg-gray-100 focus:outline-hidden hover:ring-2 hover:ring-amber-brand transition-all flex-shrink-0"
                            >
                              <img src={photo.url} alt={photo.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <Eye className="w-5 h-5 text-white" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: TASK ASSIGNMENTS BOARD */}
        {/* ============================================================ */}
        {activeTab === 'tasks' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-lg border border-gray-200 shadow-2xs">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-[#10243A]">Field Task Assignment Board</h2>
                <p className="text-xs text-gray-500">Assign electrical, mining, civil, and crane tasks directly to certified personnel.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowAssignTaskModal(true)}
                className="w-full sm:w-auto px-4 py-2 bg-[#10243A] hover:bg-[#16314D] text-white text-xs font-bold rounded flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4 text-amber-brand" />
                <span>Assign New Task</span>
              </button>
            </div>

            {tasks.length === 0 ? (
              <div className="bg-white p-8 sm:p-12 text-center rounded-lg border border-gray-200 shadow-2xs">
                <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-sm font-bold text-gray-800">No Tasks Assigned Yet</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
                  Click the "Assign New Task" button above to assign operational tasks, dielectric breakdown tests, or mining infrastructure jobs to staff members.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {tasks.map((task) => (
                  <div key={task.id} className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono font-bold text-gray-500">{task.id}</span>
                        <div className="flex items-center space-x-1.5">
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-gray-100 text-gray-800 border">
                            {task.priority}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            task.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' : 
                            task.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {task.status}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-bold text-sm text-[#10243A] break-words">{task.title}</h3>
                      <p className="text-xs text-gray-600 mt-2 leading-relaxed break-words">{task.description}</p>

                      <div className="mt-4 pt-3 border-t border-gray-100 space-y-1.5 text-xs text-gray-600">
                        <div>
                          <strong>Personnel:</strong> <span className="text-[#10243A] font-bold">{task.assignedToName}</span>
                        </div>
                        <div className="truncate">
                          <strong>Project:</strong> {task.project}
                        </div>
                        <div className="flex items-center space-x-1 truncate">
                          <MapPin className="w-3.5 h-3.5 text-amber-brand flex-shrink-0" />
                          <span className="truncate">{task.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                          <span>Deadline: <strong>{task.deadline}</strong></span>
                        </div>
                      </div>

                      {task.completionNotes && (
                        <div className="mt-3 p-2 bg-blue-50 border border-blue-100 rounded text-xs text-blue-900 break-words">
                          <strong className="block text-[10px] uppercase font-bold text-blue-700">Worker Field Progress Note:</strong>
                          {task.completionNotes}
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[10px] sm:text-[11px] text-gray-400">
                      <span>Created: {task.createdAt}</span>
                      <span className="font-semibold text-gray-600">Updated: {task.updatedAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: STAFF ROSTER & PROVISIONING */}
        {/* ============================================================ */}
        {activeTab === 'workers' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-lg border border-gray-200 shadow-2xs">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-[#10243A]">Corporate Personnel & Provisioning</h2>
                <p className="text-xs text-gray-500">
                  Only Administrators have authority to create worker accounts, configure login passwords, attach photos, and manage operational roles.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateWorkerModal(true)}
                className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
              >
                <UserPlus className="w-4 h-4" />
                <span>+ Provision Worker</span>
              </button>
            </div>

            {/* Mobile View: Responsive Staff Cards (< md screens) */}
            <div className="block md:hidden space-y-3">
              {workers.map((worker) => (
                <div key={worker.uid} className="bg-white border border-gray-200 rounded-lg p-4 shadow-2xs space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center font-bold text-amber-brand text-sm overflow-hidden flex-shrink-0">
                        {worker.avatarUrl ? (
                          <img src={worker.avatarUrl} alt="" className="w-full h-full object-cover" />
                        ) : (
                          worker.name.charAt(0)
                        )}
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold text-sm text-[#10243A] block truncate">{worker.name}</span>
                        <span className="text-xs text-gray-500 block truncate">{worker.email}</span>
                      </div>
                    </div>
                    {worker.role === 'ADMIN' ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 border border-red-300 flex-shrink-0">
                        ADMIN
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-300 flex-shrink-0">
                        WORKER
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-gray-50 p-2.5 rounded border border-gray-100">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Employee ID</span>
                      <span className="font-mono font-bold text-gray-800">{worker.employeeId}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Login Password</span>
                      <div className="flex items-center space-x-1 font-mono font-bold text-gray-800">
                        <Key className="w-3 h-3 text-amber-brand flex-shrink-0" />
                        <span>{worker.password || 'rumuli2026'}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Department</span>
                      <span className="text-gray-700 truncate block">{worker.department}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Base Salary</span>
                      <span className="font-bold text-emerald-800">{worker.baseSalary.toLocaleString()} TZS</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      worker.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' :
                      worker.status === 'ON_LEAVE' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {worker.status}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleToggleWorkerStatus(worker)}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 underline"
                    >
                      Toggle Status
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View: Full Table (>= md screens) */}
            <div className="hidden md:block bg-white border border-gray-200 rounded-lg overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                    <tr>
                      <th className="p-3 font-semibold">Staff Personnel</th>
                      <th className="p-3 font-semibold">Employee ID</th>
                      <th className="p-3 font-semibold">Login Password</th>
                      <th className="p-3 font-semibold">Role</th>
                      <th className="p-3 font-semibold">Department & Designation</th>
                      <th className="p-3 font-semibold">Base Salary (TZS)</th>
                      <th className="p-3 font-semibold">Status</th>
                      <th className="p-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {workers.map((worker) => (
                      <tr key={worker.uid} className="hover:bg-gray-50">
                        <td className="p-3">
                          <div className="flex items-center space-x-2.5">
                            <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center font-bold text-amber-brand text-xs overflow-hidden flex-shrink-0">
                              {worker.avatarUrl ? (
                                <img src={worker.avatarUrl} alt="" className="w-full h-full object-cover" />
                              ) : (
                                worker.name.charAt(0)
                              )}
                            </div>
                            <div>
                              <span className="font-bold text-[#10243A] block">{worker.name}</span>
                              <span className="text-[11px] text-gray-500">{worker.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 font-mono font-bold text-gray-700">{worker.employeeId}</td>
                        <td className="p-3">
                          <div className="flex items-center space-x-1.5 font-mono text-xs bg-gray-100 px-2 py-0.5 rounded border border-gray-200 w-fit">
                            <Key className="w-3 h-3 text-amber-brand" />
                            <span className="font-bold text-gray-800">{worker.password || 'rumuli2026'}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          {worker.role === 'ADMIN' ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 border border-red-300">
                              ADMIN
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-300">
                              WORKER
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-gray-700">
                          <div className="font-semibold">{worker.designation}</div>
                          <div className="text-[11px] text-gray-500">{worker.department}</div>
                        </td>
                        <td className="p-3 font-bold text-emerald-800">
                          {worker.baseSalary.toLocaleString()} TZS
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            worker.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' :
                            worker.status === 'ON_LEAVE' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {worker.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            type="button"
                            onClick={() => handleToggleWorkerStatus(worker)}
                            className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 underline"
                          >
                            Toggle Status
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 5: LIVE ACTIVITY AUDIT TRAIL */}
        {/* ============================================================ */}
        {activeTab === 'audit' && (
          <div className="space-y-5">
            <div className="bg-white p-4 sm:p-5 rounded-lg border border-gray-200 shadow-2xs">
              <h2 className="text-sm sm:text-base font-bold text-[#10243A]">Corporate Profile Activity Audit Trail</h2>
              <p className="text-xs text-gray-500 mt-1">
                Audited real-time telemetry recording worker sign-ins, field task updates, material requests, and administrative approvals.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100 shadow-2xs">
              {activityLogs.length === 0 ? (
                <div className="p-8 text-center text-xs text-gray-500">No activity events recorded yet.</div>
              ) : (
                activityLogs.map((log) => (
                  <div key={log.id} className="p-3 sm:p-4 flex items-start space-x-2.5 sm:space-x-3 hover:bg-gray-50 transition-colors">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {log.category === 'AUTH' && <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />}
                      {log.category === 'TASK' && <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />}
                      {log.category === 'SALARY' && <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />}
                      {log.category === 'MATERIALS' && <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" />}
                      {log.category === 'EXPENSE' && <Receipt className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />}
                      {log.category === 'ADMIN' && <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="font-bold text-xs text-[#10243A]">{log.workerName}</span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-gray-100 text-gray-600 uppercase">
                          {log.category}
                        </span>
                        <span className="text-[11px] text-gray-400">• {log.timestamp}</span>
                      </div>
                      <div className="font-semibold text-xs text-gray-800 mt-0.5 break-words">{log.action}</div>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed break-words">{log.details}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </main>

      {/* ============================================================ */}
      {/* MODAL 1: ASSIGN TASK */}
      {/* ============================================================ */}
      {showAssignTaskModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-4 sm:p-6 shadow-2xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-sm font-bold text-[#10243A]">Assign New Worksite Task</h3>
              <button onClick={() => setShowAssignTaskModal(false)} className="text-gray-400 hover:text-gray-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAssignTask} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Select Field Worker</label>
                {workers.length === 0 ? (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-900">
                    No workers provisioned yet. Please provision a worker account first!
                  </div>
                ) : (
                  <select
                    value={newTaskWorkerUid}
                    onChange={(e) => setNewTaskWorkerUid(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded p-2.5 text-xs font-semibold bg-white"
                  >
                    {workers.map((w) => (
                      <option key={w.uid} value={w.uid}>
                        {w.name} ({w.employeeId}) — {w.designation}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Task Title</label>
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. 33kV Live-Line insulator cleaning & drop-out fuse overhaul"
                  required
                  className="w-full border border-gray-300 rounded p-2.5 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Project Name</label>
                  <input
                    type="text"
                    value={newTaskProject}
                    onChange={(e) => setNewTaskProject(e.target.value)}
                    placeholder="e.g. Geita Gold Leaching Plant"
                    required
                    className="w-full border border-gray-300 rounded p-2.5 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Site Location</label>
                  <input
                    type="text"
                    value={newTaskLocation}
                    onChange={(e) => setNewTaskLocation(e.target.value)}
                    placeholder="e.g. Geita Mining Belt"
                    required
                    className="w-full border border-gray-300 rounded p-2.5 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Priority Urgency</label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value as TaskPriority)}
                    className="w-full border border-gray-300 rounded p-2.5 text-xs bg-white"
                  >
                    <option value="CRITICAL">CRITICAL (EMERGENCY)</option>
                    <option value="HIGH">HIGH PRIORITY</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Completion Deadline</label>
                  <input
                    type="date"
                    value={newTaskDeadline}
                    onChange={(e) => setNewTaskDeadline(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded p-2.5 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Engineering Scope & Instructions</label>
                <textarea
                  rows={3}
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                  placeholder="Provide precise scope of work, safety requirements, and test protocols..."
                  required
                  className="w-full border border-gray-300 rounded p-2.5 text-xs"
                />
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAssignTaskModal(false)}
                  className="w-full sm:w-auto px-4 py-2 text-xs text-gray-600 hover:text-gray-800 text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={workers.length === 0}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#10243A] text-white rounded text-xs font-bold hover:bg-[#16314D] disabled:opacity-50"
                >
                  Confirm & Assign Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 2: PROVISION WORKER ACCOUNT (Admin sets password & photo) */}
      {/* ============================================================ */}
      {showCreateWorkerModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-4 sm:p-6 shadow-2xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <UserPlus className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-bold text-[#10243A]">Provision New Staff Account</h3>
              </div>
              <button onClick={() => setShowCreateWorkerModal(false)} className="text-gray-400 hover:text-gray-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProvisionWorker} className="mt-4 space-y-3.5">
              
              {/* Photo Upload */}
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-200 border border-gray-300 overflow-hidden flex items-center justify-center flex-shrink-0">
                  {newWorkerAvatar ? (
                    <img src={newWorkerAvatar} alt="Worker Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <Users className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    Staff Profile Photo
                  </label>
                  <label className="cursor-pointer inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-gray-300 rounded text-xs font-semibold text-gray-700 hover:bg-gray-100 shadow-2xs">
                    <ImageIcon className="w-3.5 h-3.5 text-amber-brand" />
                    <span>Choose Photo File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleWorkerPhotoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={newWorkerName}
                    onChange={(e) => setNewWorkerName(e.target.value)}
                    placeholder="e.g. Daudi S. Mwinyi"
                    required
                    className="w-full border border-gray-300 rounded p-2.5 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Employee ID</label>
                  <input
                    type="text"
                    value={newWorkerEmpId}
                    onChange={(e) => setNewWorkerEmpId(e.target.value)}
                    placeholder="e.g. RUM-ENG-402"
                    className="w-full border border-gray-300 rounded p-2.5 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Corporate Login Email</label>
                  <input
                    type="email"
                    value={newWorkerEmail}
                    onChange={(e) => setNewWorkerEmail(e.target.value)}
                    placeholder="e.g. worker@rumuli.com"
                    required
                    className="w-full border border-gray-300 rounded p-2.5 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    <span className="text-amber-700 font-bold">Admin-Assigned Password</span>
                  </label>
                  <input
                    type="text"
                    value={newWorkerPassword}
                    onChange={(e) => setNewWorkerPassword(e.target.value)}
                    placeholder="e.g. rumuli2026"
                    required
                    className="w-full border border-amber-300 bg-amber-50/50 rounded p-2.5 text-xs font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">System Role</label>
                  <select
                    value={newWorkerRole}
                    onChange={(e) => setNewWorkerRole(e.target.value as any)}
                    className="w-full border border-gray-300 rounded p-2.5 text-xs font-bold bg-white"
                  >
                    <option value="WORKER">WORKER (FIELD STAFF)</option>
                    <option value="ADMIN">ADMIN (EXECUTIVE MANAGEMENT)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={newWorkerPhone}
                    onChange={(e) => setNewWorkerPhone(e.target.value)}
                    placeholder="+255 7XX XXX XXX"
                    className="w-full border border-gray-300 rounded p-2.5 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Department</label>
                  <select
                    value={newWorkerDept}
                    onChange={(e) => setNewWorkerDept(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2.5 text-xs bg-white"
                  >
                    <option value="Substations & Live-Line Power">Substations & Live-Line Power</option>
                    <option value="Mining Infrastructure & Mineral Processing">Mining Infrastructure & Mineral Processing</option>
                    <option value="Heavy Plant & Transport Fleet">Heavy Plant & Transport Fleet</option>
                    <option value="Transmission & Distribution Lines">Transmission & Distribution Lines</option>
                    <option value="Civil & Structural Works">Civil & Structural Works</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Monthly Base Salary (TZS)</label>
                  <input
                    type="number"
                    step="50000"
                    value={newWorkerSalary}
                    onChange={(e) => setNewWorkerSalary(Number(e.target.value))}
                    required
                    className="w-full border border-gray-300 rounded p-2.5 text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Designation / Title</label>
                <input
                  type="text"
                  value={newWorkerDesignation}
                  onChange={(e) => setNewWorkerDesignation(e.target.value)}
                  placeholder="e.g. Senior Live-Line Substation Engineer"
                  required
                  className="w-full border border-gray-300 rounded p-2.5 text-xs"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded text-xs text-amber-900 border border-amber-200 leading-relaxed">
                The worker can immediately sign into the staff portal with their email and the password you have configured above.
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateWorkerModal(false)}
                  className="w-full sm:w-auto px-4 py-2 text-xs text-gray-600 hover:text-gray-800 text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 text-white rounded text-xs font-bold hover:bg-emerald-700"
                >
                  Provision Staff Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 3: REVIEW / DECISION CONFIRMATION */}
      {/* ============================================================ */}
      {reviewItem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-4 sm:p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-sm font-bold text-[#10243A]">
                Confirm Decision: {reviewItem.action}
              </h3>
              <button onClick={() => setReviewItem(null)} className="text-gray-400 hover:text-gray-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleExecuteReview} className="mt-4 space-y-3.5">
              <div className="p-3 bg-gray-50 border border-gray-200 rounded text-xs space-y-1">
                <div className="break-words"><strong>Subject:</strong> {reviewItem.title}</div>
                <div><strong>Worker:</strong> {reviewItem.worker}</div>
                <div>
                  <strong>Decision:</strong>{' '}
                  <span className={`font-bold ${
                    reviewItem.action === 'APPROVED' ? 'text-emerald-700' : 'text-red-700'
                  }`}>
                    {reviewItem.action}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Executive Decision Notes & Remarks
                </label>
                <textarea
                  rows={3}
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded p-2.5 text-xs"
                />
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setReviewItem(null)}
                  className="w-full sm:w-auto px-4 py-2 text-xs text-gray-600 hover:text-gray-800 text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`w-full sm:w-auto px-5 py-2.5 text-white rounded text-xs font-bold ${
                    reviewItem.action === 'APPROVED' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  Commit Decision
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 4: PROJECT REPORT REVIEW MODAL */}
      {/* ============================================================ */}
      {reportReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-4 sm:p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-sm font-bold text-[#10243A]">
                Acknowledge & Review Field Report
              </h3>
              <button onClick={() => setReportReviewModal(null)} className="text-gray-400 hover:text-gray-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReviewProjectReport} className="mt-4 space-y-3.5">
              <div className="p-3 bg-gray-50 border border-gray-200 rounded text-xs space-y-1">
                <div className="break-words"><strong>Project:</strong> {reportReviewModal.projectTitle}</div>
                <div><strong>Submitted By:</strong> {reportReviewModal.workerName}</div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Engineering Management Feedback / Review Notes
                </label>
                <textarea
                  rows={3}
                  value={reportReviewNotes}
                  onChange={(e) => setReportReviewNotes(e.target.value)}
                  placeholder="Provide review feedback or instructions..."
                  required
                  className="w-full border border-gray-300 rounded p-2.5 text-xs"
                />
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setReportReviewModal(null)}
                  className="w-full sm:w-auto px-4 py-2 text-xs text-gray-600 hover:text-gray-800 text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold"
                >
                  Confirm Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 5: PHOTO / RECEIPT INSPECTION LIGHTBOX */}
      {/* ============================================================ */}
      {previewImage && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-3 sm:p-4 relative shadow-2xl">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
              <h4 className="text-xs sm:text-sm font-bold text-[#10243A]">Audited Document / Field Photo Evidence</h4>
              <button
                onClick={() => setPreviewImage(null)}
                className="bg-gray-100 hover:bg-gray-200 p-1.5 rounded-full text-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-[70vh] overflow-auto flex items-center justify-center bg-gray-950 rounded-lg p-2">
              <img src={previewImage} alt="Audited Preview" className="max-w-full max-h-[65vh] object-contain rounded" />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
