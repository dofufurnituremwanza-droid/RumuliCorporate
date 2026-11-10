import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PortalHeader } from '../../components/portal/PortalHeader';
import { PortalService } from '../../services/portalService';
import { 
  WorkerTask, 
  EarlySalaryRequest, 
  MaterialRequest, 
  FieldExpense, 
  TaskStatus,
  ExpenseCategory
} from '../../types/portal';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  DollarSign, 
  Package, 
  Receipt, 
  Briefcase, 
  Plus, 
  FileText, 
  Calendar, 
  MapPin, 
  FileCheck, 
  X, 
  Upload, 
  Eye, 
  Sparkles,
  Info,
  Building,
  User,
  Coffee,
  Bed,
  Car
} from 'lucide-react';

export const WorkerDashboard: React.FC = () => {
  const { currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState<'tasks' | 'salary' | 'materials' | 'expenses' | 'profile'>('tasks');
  const [tasks, setTasks] = useState<WorkerTask[]>([]);
  const [salaryRequests, setSalaryRequests] = useState<EarlySalaryRequest[]>([]);
  const [materialRequests, setMaterialRequests] = useState<MaterialRequest[]>([]);
  const [expenses, setExpenses] = useState<FieldExpense[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [showTaskUpdateModal, setShowTaskUpdateModal] = useState<WorkerTask | null>(null);
  const [taskStatusChoice, setTaskStatusChoice] = useState<TaskStatus>('IN_PROGRESS');
  const [taskNotes, setTaskNotes] = useState('');

  const [showSalaryModal, setShowSalaryModal] = useState(false);
  const [salaryAmount, setSalaryAmount] = useState<number>(300000);
  const [salaryReason, setSalaryReason] = useState('');
  const [repaymentPlan, setRepaymentPlan] = useState('Deduct 100% from upcoming monthly payslip');

  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const [matProject, setMatProject] = useState('');
  const [matLocation, setMatLocation] = useState('');
  const [matUrgency, setMatUrgency] = useState<'NORMAL' | 'URGENT'>('NORMAL');
  const [matJustification, setMatJustification] = useState('');
  const [matItems, setMatItems] = useState<Array<{ item: string; quantity: number; unit: string; purpose: string }>>([
    { item: '', quantity: 1, unit: 'Pieces', purpose: '' }
  ]);

  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [expCategory, setExpCategory] = useState<ExpenseCategory>('FOOD_PER_DIEM');
  const [expDestination, setExpDestination] = useState('');
  const [expDays, setExpDays] = useState<number>(1);
  const [expAmount, setExpAmount] = useState<number>(60000);
  const [expDescription, setExpDescription] = useState('');
  const [expReceiptFile, setExpReceiptFile] = useState<string | null>(null);
  const [expReceiptName, setExpReceiptName] = useState<string | null>(null);

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Load data for this worker
  const loadWorkerData = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const [t, s, m, e] = await Promise.all([
        PortalService.getTasks(currentUser.uid),
        PortalService.getSalaryRequests(currentUser.uid),
        PortalService.getMaterialRequests(currentUser.uid),
        PortalService.getFieldExpenses(currentUser.uid)
      ]);
      setTasks(t);
      setSalaryRequests(s);
      setMaterialRequests(m);
      setExpenses(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkerData();
  }, [currentUser]);

  if (!currentUser) return null;

  // Handler: Update Task Status
  const handleUpdateTaskStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showTaskUpdateModal) return;
    await PortalService.updateTaskStatus(showTaskUpdateModal.id, taskStatusChoice, taskNotes);
    setShowTaskUpdateModal(null);
    setTaskNotes('');
    await loadWorkerData();
  };

  // Handler: Submit Salary Request
  const handleSubmitSalary = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!salaryAmount || !salaryReason) return;
    await PortalService.requestEarlySalary({
      requestedAmount: Number(salaryAmount),
      reason: salaryReason,
      repaymentTerms: repaymentPlan
    });
    setShowSalaryModal(false);
    setSalaryReason('');
    await loadWorkerData();
  };

  // Handler: Add item to Material request
  const handleAddMaterialItem = () => {
    setMatItems([...matItems, { item: '', quantity: 1, unit: 'Units', purpose: '' }]);
  };

  const handleRemoveMaterialItem = (index: number) => {
    setMatItems(matItems.filter((_, i) => i !== index));
  };

  const handleMaterialItemChange = (index: number, field: string, value: any) => {
    const updated = [...matItems];
    (updated[index] as any)[field] = value;
    setMatItems(updated);
  };

  // Handler: Submit Material Request
  const handleSubmitMaterials = async (e: React.FormEvent) => {
    e.preventDefault();
    const validItems = matItems.filter(i => i.item.trim().length > 0);
    if (validItems.length === 0) return;

    await PortalService.requestMaterials({
      projectName: matProject || 'General Field Infrastructure',
      siteLocation: matLocation || 'Field Site',
      urgency: matUrgency,
      items: validItems,
      justification: matJustification
    });

    setShowMaterialModal(false);
    setMatProject('');
    setMatLocation('');
    setMatJustification('');
    setMatItems([{ item: '', quantity: 1, unit: 'Pieces', purpose: '' }]);
    await loadWorkerData();
  };

  // Handler: Handle Receipt Upload (Converts to Data URL)
  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setExpReceiptName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setExpReceiptFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handler: Submit Field Expense / Per Diem
  const handleSubmitExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expAmount || !expDestination) return;

    await PortalService.submitFieldExpense({
      category: expCategory,
      destination: expDestination,
      daysCount: expDays,
      amount: Number(expAmount),
      description: expDescription,
      receiptDataUrl: expReceiptFile || undefined,
      receiptFileName: expReceiptName || undefined
    });

    setShowExpenseModal(false);
    setExpDestination('');
    setExpDescription('');
    setExpReceiptFile(null);
    setExpReceiptName(null);
    await loadWorkerData();
  };

  // Status Badge Colors
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED':
      case 'COMPLETED':
      case 'DISBURSED':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">APPROVED</span>;
      case 'IN_PROGRESS':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-300">IN PROGRESS</span>;
      case 'REJECTED':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 border border-red-300">REJECTED</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">PENDING REVIEW</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F5F6] flex flex-col">
      <PortalHeader />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Worker Welcome Banner */}
        <div className="bg-[#10243A] text-white rounded-lg p-6 sm:p-8 shadow-md mb-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-500/50 flex items-center justify-center text-amber-brand text-xl font-bold overflow-hidden shadow-inner flex-shrink-0">
                {currentUser.avatarUrl ? (
                  <img src={currentUser.avatarUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  currentUser.name.charAt(0)
                )}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{currentUser.name}</h1>
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold">
                    {currentUser.status}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 mt-0.5">
                  {currentUser.designation} — <span className="text-amber-brand">{currentUser.department}</span>
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mt-2 font-mono">
                  <span>ID: <strong className="text-white">{currentUser.employeeId}</strong></span>
                  <span>•</span>
                  <span>Contact: {currentUser.phone}</span>
                  <span>•</span>
                  <span>Monthly Base: <strong className="text-amber-brand">{currentUser.baseSalary.toLocaleString()} TZS</strong></span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setShowExpenseModal(true)}
                className="px-3.5 py-2 text-xs font-semibold rounded bg-amber-brand text-[#10243A] hover:bg-amber-hover transition-colors flex items-center space-x-1.5 shadow-sm"
              >
                <Receipt className="w-3.5 h-3.5" />
                <span>Claim Field Per Diem / Receipts</span>
              </button>
              <button
                type="button"
                onClick={() => setShowSalaryModal(true)}
                className="px-3.5 py-2 text-xs font-semibold rounded bg-[#1C3E61] text-white hover:bg-[#234d77] border border-[#2B5480] transition-colors flex items-center space-x-1.5"
              >
                <DollarSign className="w-3.5 h-3.5 text-amber-brand" />
                <span>Request Early Salary</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 bg-white rounded-t-lg px-4 shadow-2xs mb-6 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('tasks')}
            className={`py-3.5 px-4 font-bold text-xs uppercase tracking-wider border-b-2 transition-colors flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'tasks'
                ? 'border-amber-brand text-[#10243A]'
                : 'border-transparent text-gray-500 hover:text-[#10243A]'
            }`}
          >
            <Briefcase className="w-4 h-4 text-amber-brand" />
            <span>Assigned Tasks</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-gray-100 font-bold">{tasks.length}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('salary')}
            className={`py-3.5 px-4 font-bold text-xs uppercase tracking-wider border-b-2 transition-colors flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'salary'
                ? 'border-amber-brand text-[#10243A]'
                : 'border-transparent text-gray-500 hover:text-[#10243A]'
            }`}
          >
            <DollarSign className="w-4 h-4 text-emerald-600" />
            <span>Early Salary Advances</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-gray-100 font-bold">{salaryRequests.length}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('materials')}
            className={`py-3.5 px-4 font-bold text-xs uppercase tracking-wider border-b-2 transition-colors flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'materials'
                ? 'border-amber-brand text-[#10243A]'
                : 'border-transparent text-gray-500 hover:text-[#10243A]'
            }`}
          >
            <Package className="w-4 h-4 text-blue-600" />
            <span>Material Requisitions</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-gray-100 font-bold">{materialRequests.length}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('expenses')}
            className={`py-3.5 px-4 font-bold text-xs uppercase tracking-wider border-b-2 transition-colors flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'expenses'
                ? 'border-amber-brand text-[#10243A]'
                : 'border-transparent text-gray-500 hover:text-[#10243A]'
            }`}
          >
            <Receipt className="w-4 h-4 text-amber-600" />
            <span>Field Expenses & Per Diem</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-gray-100 font-bold">{expenses.length}</span>
          </button>
        </div>

        {/* ============================================================ */}
        {/* TAB 1: ASSIGNED TASKS */}
        {/* ============================================================ */}
        {activeTab === 'tasks' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-[#10243A]">Work Assignments & Field Deployments</h2>
                <p className="text-xs text-gray-500">Tasks officially assigned to you by Rumuli Corporate Project Administration.</p>
              </div>
            </div>

            {tasks.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-lg border border-gray-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-gray-800">All Assignments Complete</h3>
                <p className="text-xs text-gray-500 mt-1">You currently have no pending tasks assigned by Administration.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tasks.map((task) => (
                  <div key={task.id} className="bg-white border border-gray-200 rounded-lg p-5 shadow-2xs flex flex-col justify-between hover:border-amber-brand/50 transition-colors">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono font-bold text-gray-500">{task.id}</span>
                        <div className="flex items-center space-x-1.5">
                          {task.priority === 'CRITICAL' && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-100 text-red-800 border border-red-300">CRITICAL</span>
                          )}
                          {task.priority === 'HIGH' && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-800 border border-amber-300">HIGH PRIORITY</span>
                          )}
                          {renderStatusBadge(task.status)}
                        </div>
                      </div>

                      <h3 className="font-bold text-sm text-[#10243A] leading-snug">{task.title}</h3>
                      <p className="text-xs text-gray-600 mt-2 leading-relaxed">{task.description}</p>

                      <div className="mt-4 pt-3 border-t border-gray-100 space-y-1.5 text-xs text-gray-500">
                        <div className="flex items-center space-x-1.5">
                          <Building className="w-3.5 h-3.5 text-gray-400" />
                          <span className="font-semibold text-gray-700">{task.project}</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <MapPin className="w-3.5 h-3.5 text-amber-brand" />
                          <span>{task.location}</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          <span>Deadline: <strong className="text-gray-800">{task.deadline}</strong></span>
                        </div>
                      </div>

                      {task.completionNotes && (
                        <div className="mt-3 p-2 bg-blue-50 border border-blue-100 rounded text-xs text-blue-900">
                          <strong className="block text-[10px] uppercase font-bold text-blue-700">Field Progress Note:</strong>
                          {task.completionNotes}
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[10px] text-gray-400">Assigned by: {task.assignedBy}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setShowTaskUpdateModal(task);
                          setTaskStatusChoice(task.status);
                          setTaskNotes(task.completionNotes || '');
                        }}
                        className="px-3 py-1.5 text-xs font-semibold rounded bg-[#10243A] text-white hover:bg-[#16314D] transition-colors"
                      >
                        Update Status
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: EARLY SALARY ADVANCES */}
        {/* ============================================================ */}
        {activeTab === 'salary' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-lg border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-[#10243A]">Early Salary Advance Portal</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Emergency financial welfare program. Eligible staff can request an advance of up to 50% of monthly base salary ({Math.floor(currentUser.baseSalary * 0.5).toLocaleString()} TZS max).
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowSalaryModal(true)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded flex items-center space-x-1.5 transition-colors shadow-sm flex-shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Request Early Salary</span>
              </button>
            </div>

            {/* Salary Requests Table */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-2xs">
              <div className="px-5 py-3 border-b border-gray-100 bg-[#F9FAFB] flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-600">Your Salary Advance History</span>
                <span className="text-xs text-gray-500">{salaryRequests.length} records</span>
              </div>

              {salaryRequests.length === 0 ? (
                <div className="p-8 text-center text-xs text-gray-500">No early salary requests filed.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                      <tr>
                        <th className="p-3 font-semibold">Request ID</th>
                        <th className="p-3 font-semibold">Amount Requested</th>
                        <th className="p-3 font-semibold">Reason</th>
                        <th className="p-3 font-semibold">Repayment Plan</th>
                        <th className="p-3 font-semibold">Status</th>
                        <th className="p-3 font-semibold">Admin Feedback</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {salaryRequests.map((req) => (
                        <tr key={req.id} className="hover:bg-gray-50">
                          <td className="p-3 font-mono font-bold text-[#10243A]">{req.id}</td>
                          <td className="p-3 font-bold text-emerald-700">
                            {req.requestedAmount.toLocaleString()} TZS
                          </td>
                          <td className="p-3 text-gray-700 max-w-xs">{req.reason}</td>
                          <td className="p-3 text-gray-600">{req.repaymentTerms}</td>
                          <td className="p-3">{renderStatusBadge(req.status)}</td>
                          <td className="p-3 text-gray-500 italic">
                            {req.reviewNotes ? req.reviewNotes : (req.status === 'PENDING' ? 'Awaiting Admin review' : 'No notes')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: MATERIAL REQUISITIONS */}
        {/* ============================================================ */}
        {activeTab === 'materials' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-lg border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-[#10243A]">Worksite Material Requisition</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Request electrical conductors, transformers, switchgear, insulators, cement, cables, and tools for active field sites.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowMaterialModal(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded flex items-center space-x-1.5 transition-colors shadow-sm flex-shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>New Material Requisition</span>
              </button>
            </div>

            {/* Requisitions List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {materialRequests.map((req) => (
                <div key={req.id} className="bg-white border border-gray-200 rounded-lg p-5 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono font-bold text-gray-500">{req.id}</span>
                      <div className="flex items-center space-x-1.5">
                        {req.urgency === 'URGENT' && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-100 text-red-800">URGENT</span>
                        )}
                        {renderStatusBadge(req.status)}
                      </div>
                    </div>

                    <h3 className="font-bold text-sm text-[#10243A]">{req.projectName}</h3>
                    <div className="text-xs text-gray-500 flex items-center space-x-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-amber-brand" />
                      <span>{req.siteLocation}</span>
                    </div>

                    <div className="mt-3 p-3 bg-gray-50 border border-gray-100 rounded">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
                        Requested Material Items:
                      </span>
                      <ul className="space-y-1 text-xs">
                        {req.items.map((item, idx) => (
                          <li key={idx} className="flex items-center justify-between">
                            <span className="text-gray-800 font-medium">• {item.item}</span>
                            <span className="font-mono text-gray-600">{item.quantity} {item.unit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className="text-xs text-gray-600 mt-2 italic">"{req.justification}"</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-400 flex items-center justify-between">
                    <span>Filed: {req.requestedAt}</span>
                    {req.reviewNotes && (
                      <span className="text-blue-700 font-semibold">{req.reviewNotes}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: FIELD PER DIEM & EXPENSE RECEIPTS */}
        {/* ============================================================ */}
        {activeTab === 'expenses' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-lg border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-[#10243A]">Field Per Diem, Meals, Sleep & Receipts</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  When deployed on far assignments (e.g. Geita mine site, rural electrification, substations), claim daily food allowances, lodging/hotel receipts, transit tickets, and fuel.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowExpenseModal(true)}
                className="px-4 py-2 bg-amber-brand hover:bg-amber-hover text-[#10243A] text-xs font-bold rounded flex items-center space-x-1.5 transition-colors shadow-sm flex-shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Submit Per Diem or Receipt</span>
              </button>
            </div>

            {/* Expense Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {expenses.map((exp) => (
                <div key={exp.id} className="bg-white border border-gray-200 rounded-lg p-5 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono font-bold text-gray-500">{exp.id}</span>
                      {renderStatusBadge(exp.status)}
                    </div>

                    <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-brand mb-1">
                      {exp.category === 'FOOD_PER_DIEM' && <Coffee className="w-4 h-4" />}
                      {exp.category === 'ACCOMMODATION_SLEEP' && <Bed className="w-4 h-4" />}
                      {exp.category === 'TRAVEL_TRANSPORT' && <Car className="w-4 h-4" />}
                      <span>{exp.category.replace(/_/g, ' ')}</span>
                    </div>

                    <div className="text-lg font-black text-[#10243A]">
                      {exp.amount.toLocaleString()} TZS
                    </div>

                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{exp.description}</p>

                    <div className="mt-3 text-xs text-gray-500 space-y-1">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-brand flex-shrink-0" />
                        <span className="truncate">{exp.destination}</span>
                      </div>
                      {exp.daysCount && (
                        <div className="flex items-center space-x-1 text-gray-600">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          <span>Duration: <strong>{exp.daysCount} Days on-site</strong></span>
                        </div>
                      )}
                    </div>

                    {/* Receipt Attachment Thumbnail */}
                    {exp.receiptDataUrl && (
                      <div className="mt-3 p-2 bg-gray-50 border border-gray-200 rounded flex items-center justify-between">
                        <div className="flex items-center space-x-2 truncate">
                          <FileText className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span className="text-xs text-gray-700 truncate">{exp.receiptFileName || 'Receipt Attachment'}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setPreviewImage(exp.receiptDataUrl || null)}
                          className="px-2 py-1 text-[11px] font-semibold text-blue-700 hover:text-blue-900 flex items-center space-x-1"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Inspect</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                    <span>{exp.submittedAt}</span>
                    {exp.reviewNotes && (
                      <span className="text-emerald-700 font-semibold">{exp.reviewNotes}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* ============================================================ */}
      {/* MODAL 1: UPDATE TASK STATUS */}
      {/* ============================================================ */}
      {showTaskUpdateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-sm font-bold text-[#10243A]">Update Field Task Status</h3>
              <button onClick={() => setShowTaskUpdateModal(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateTaskStatus} className="mt-4 space-y-4">
              <div>
                <span className="text-xs text-gray-500 font-mono block">{showTaskUpdateModal.id}</span>
                <h4 className="font-bold text-sm text-[#10243A]">{showTaskUpdateModal.title}</h4>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Set Current Status</label>
                <select
                  value={taskStatusChoice}
                  onChange={(e) => setTaskStatusChoice(e.target.value as TaskStatus)}
                  className="w-full border border-gray-300 rounded p-2 text-xs text-[#10243A] font-semibold"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="ON_HOLD">ON HOLD</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Field Completion Notes & Observations</label>
                <textarea
                  rows={3}
                  value={taskNotes}
                  onChange={(e) => setTaskNotes(e.target.value)}
                  placeholder="e.g. Conducted transformer oil breakdown test at 65kV. Phase terminations connected and ready for energization."
                  className="w-full border border-gray-300 rounded p-2 text-xs text-[#10243A]"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowTaskUpdateModal(null)}
                  className="px-3 py-1.5 text-xs text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#10243A] text-white rounded text-xs font-bold hover:bg-[#16314D]"
                >
                  Save Task Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 2: EARLY SALARY REQUEST */}
      {/* ============================================================ */}
      {showSalaryModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-bold text-[#10243A]">Request Early Salary Advance</h3>
              </div>
              <button onClick={() => setShowSalaryModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitSalary} className="mt-4 space-y-4">
              <div className="p-3 bg-blue-50 border border-blue-100 rounded text-xs text-blue-900">
                <div className="flex justify-between font-bold">
                  <span>Monthly Base Salary:</span>
                  <span>{currentUser.baseSalary.toLocaleString()} TZS</span>
                </div>
                <div className="flex justify-between text-gray-600 mt-1">
                  <span>Max Allowed Advance (50%):</span>
                  <span>{Math.floor(currentUser.baseSalary * 0.5).toLocaleString()} TZS</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Requested Advance Amount (TZS)</label>
                <input
                  type="number"
                  min="50000"
                  max={Math.floor(currentUser.baseSalary * 0.5)}
                  step="10000"
                  value={salaryAmount}
                  onChange={(e) => setSalaryAmount(Number(e.target.value))}
                  required
                  className="w-full border border-gray-300 rounded p-2 text-sm font-bold text-[#10243A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Reason for Emergency Early Payout</label>
                <textarea
                  rows={2}
                  value={salaryReason}
                  onChange={(e) => setSalaryReason(e.target.value)}
                  placeholder="e.g. Urgent family hospitalization bills / Children school semester fee deadline"
                  required
                  className="w-full border border-gray-300 rounded p-2 text-xs text-[#10243A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Repayment Deduction Terms</label>
                <select
                  value={repaymentPlan}
                  onChange={(e) => setRepaymentPlan(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2 text-xs text-[#10243A]"
                >
                  <option value="Deduct 100% from upcoming monthly payslip">Deduct 100% from upcoming end-of-month payslip</option>
                  <option value="Split 50% across next two consecutive payroll cycles">Split deduction across next 2 monthly payroll cycles</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSalaryModal(false)}
                  className="px-3 py-1.5 text-xs text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-600 text-white rounded text-xs font-bold hover:bg-emerald-700"
                >
                  Submit for Admin Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 3: MATERIAL REQUISITION */}
      {/* ============================================================ */}
      {showMaterialModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-bold text-[#10243A]">Request Worksite Materials</h3>
              </div>
              <button onClick={() => setShowMaterialModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitMaterials} className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Project Name</label>
                  <input
                    type="text"
                    value={matProject}
                    onChange={(e) => setMatProject(e.target.value)}
                    placeholder="e.g. Geita Gold Leaching Plant"
                    required
                    className="w-full border border-gray-300 rounded p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Site Location</label>
                  <input
                    type="text"
                    value={matLocation}
                    onChange={(e) => setMatLocation(e.target.value)}
                    placeholder="e.g. Lake Zone Block B"
                    required
                    className="w-full border border-gray-300 rounded p-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Urgency Level</label>
                <select
                  value={matUrgency}
                  onChange={(e) => setMatUrgency(e.target.value as any)}
                  className="w-full border border-gray-300 rounded p-2 text-xs"
                >
                  <option value="NORMAL">NORMAL DELIVERY</option>
                  <option value="URGENT">URGENT (CRITICAL PATH)</option>
                </select>
              </div>

              {/* Items List */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-gray-700">Material Items Needed</label>
                  <button
                    type="button"
                    onClick={handleAddMaterialItem}
                    className="text-xs text-blue-600 font-bold hover:text-blue-800 flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Item</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {matItems.map((item, index) => (
                    <div key={index} className="p-2.5 bg-gray-50 border border-gray-200 rounded flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Item name / spec (e.g. 33kV Copper Cable)"
                        value={item.item}
                        onChange={(e) => handleMaterialItemChange(index, 'item', e.target.value)}
                        required
                        className="flex-1 border border-gray-300 rounded p-1.5 text-xs bg-white"
                      />
                      <input
                        type="number"
                        placeholder="Qty"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleMaterialItemChange(index, 'quantity', Number(e.target.value))}
                        required
                        className="w-16 border border-gray-300 rounded p-1.5 text-xs bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Unit (Meters, Sets, Bags)"
                        value={item.unit}
                        onChange={(e) => handleMaterialItemChange(index, 'unit', e.target.value)}
                        className="w-20 border border-gray-300 rounded p-1.5 text-xs bg-white"
                      />
                      {matItems.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMaterialItem(index)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Operational Justification</label>
                <textarea
                  rows={2}
                  value={matJustification}
                  onChange={(e) => setMatJustification(e.target.value)}
                  placeholder="Explain why materials are required for site progress..."
                  required
                  className="w-full border border-gray-300 rounded p-2 text-xs"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowMaterialModal(false)}
                  className="px-3 py-1.5 text-xs text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 text-white rounded text-xs font-bold hover:bg-blue-700"
                >
                  Submit Material Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 4: FIELD PER DIEM & EXPENSE RECEIPT CLAIM */}
      {/* ============================================================ */}
      {showExpenseModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <Receipt className="w-5 h-5 text-amber-brand" />
                <h3 className="text-sm font-bold text-[#10243A]">Claim Field Per Diem & Receipts</h3>
              </div>
              <button onClick={() => setShowExpenseModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitExpense} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Allowance / Expense Category</label>
                <select
                  value={expCategory}
                  onChange={(e) => setExpCategory(e.target.value as ExpenseCategory)}
                  className="w-full border border-gray-300 rounded p-2 text-xs text-[#10243A] font-semibold"
                >
                  <option value="FOOD_PER_DIEM">Food & Meals Daily Allowance (Per Diem)</option>
                  <option value="ACCOMMODATION_SLEEP">Accommodation & Lodge / Hotel Receipt</option>
                  <option value="TRAVEL_TRANSPORT">Transit Ticket / Bus / Vehicle Transport</option>
                  <option value="FUEL_ALLOWANCE">Vehicle / Generator Diesel Fuel</option>
                  <option value="EMERGENCY_MATERIALS">Emergency Site Consumables / Hardware</option>
                  <option value="OTHER_EXPENDITURE">Other Authorized Field Expense</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Worksite Destination / Far Location</label>
                <input
                  type="text"
                  value={expDestination}
                  onChange={(e) => setExpDestination(e.target.value)}
                  placeholder="e.g. Geita Gold Mine Site (Overnight Mobilization)"
                  required
                  className="w-full border border-gray-300 rounded p-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Days on Site</label>
                  <input
                    type="number"
                    min="1"
                    value={expDays}
                    onChange={(e) => setExpDays(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded p-2 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Total Amount (TZS)</label>
                  <input
                    type="number"
                    min="5000"
                    step="5000"
                    value={expAmount}
                    onChange={(e) => setExpAmount(Number(e.target.value))}
                    required
                    className="w-full border border-gray-300 rounded p-2 text-xs font-bold text-[#10243A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Expenditure Details</label>
                <textarea
                  rows={2}
                  value={expDescription}
                  onChange={(e) => setExpDescription(e.target.value)}
                  placeholder="e.g. Food allowance for 5 days of substation wiring + lodging invoice attached."
                  required
                  className="w-full border border-gray-300 rounded p-2 text-xs"
                />
              </div>

              {/* Receipt Attachment File Input */}
              <div className="p-3 bg-amber-50/60 border border-amber-200 rounded">
                <label className="block text-xs font-bold text-[#10243A] mb-1 flex items-center space-x-1.5">
                  <Upload className="w-3.5 h-3.5 text-amber-brand" />
                  <span>Attach Expenditure Receipt / Hotel Invoice</span>
                </label>
                <p className="text-[11px] text-gray-500 mb-2">
                  Take a photo of your receipt, lodge tax invoice, or bus ticket.
                </p>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleReceiptUpload}
                  className="w-full text-xs text-gray-700 file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#10243A] file:text-white hover:file:bg-[#16314D]"
                />
                {expReceiptName && (
                  <div className="mt-2 text-xs text-emerald-700 font-semibold flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Attached: {expReceiptName}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowExpenseModal(false)}
                  className="px-3 py-1.5 text-xs text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-brand text-[#10243A] rounded text-xs font-bold hover:bg-amber-hover"
                >
                  Submit Field Claim
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 5: RECEIPT INSPECTION LIGHTBOX */}
      {/* ============================================================ */}
      {previewImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-xl w-full p-4 relative">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute right-3 top-3 bg-gray-100 hover:bg-gray-200 p-1 rounded-full text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h4 className="text-sm font-bold text-[#10243A] mb-3">Audited Receipt Document</h4>
            <div className="max-h-[70vh] overflow-auto flex items-center justify-center bg-gray-100 rounded p-2">
              <img src={previewImage} alt="Receipt Preview" className="max-w-full max-h-[65vh] object-contain rounded" />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
