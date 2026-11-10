import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PortalHeader } from '../../components/portal/PortalHeader';
import { PortalService } from '../../services/portalService';
import { 
  WorkerTask, 
  EarlySalaryRequest, 
  MaterialRequest, 
  FieldExpense, 
  ProjectReport,
  TaskStatus,
  ExpenseCategory
} from '../../types/portal';
import { 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Package, 
  Receipt, 
  Briefcase, 
  Plus, 
  FileText, 
  Calendar, 
  MapPin, 
  X, 
  Upload, 
  Eye, 
  Building, 
  Coffee, 
  Bed, 
  Car,
  Camera,
  ShieldCheck,
  AlertTriangle,
  HardHat,
  ClipboardCheck,
  Image as ImageIcon
} from 'lucide-react';

export const WorkerDashboard: React.FC = () => {
  const { currentUser, refreshCurrentUser } = useAuth();
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<'tasks' | 'reports' | 'salary' | 'materials' | 'expenses' | 'safety'>('tasks');
  const [tasks, setTasks] = useState<WorkerTask[]>([]);
  const [reports, setReports] = useState<ProjectReport[]>([]);
  const [salaryRequests, setSalaryRequests] = useState<EarlySalaryRequest[]>([]);
  const [materialRequests, setMaterialRequests] = useState<MaterialRequest[]>([]);
  const [expenses, setExpenses] = useState<FieldExpense[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [showTaskUpdateModal, setShowTaskUpdateModal] = useState<WorkerTask | null>(null);
  const [taskStatusChoice, setTaskStatusChoice] = useState<TaskStatus>('IN_PROGRESS');
  const [taskNotes, setTaskNotes] = useState('');

  // Project Report Form State
  const [showReportModal, setShowReportModal] = useState(false);
  const [repProject, setRepProject] = useState('');
  const [repLocation, setRepLocation] = useState('');
  const [repDate, setRepDate] = useState(new Date().toISOString().split('T')[0]);
  const [repWorkCompleted, setRepWorkCompleted] = useState('');
  const [repChallenges, setRepChallenges] = useState('');
  const [repWeatherHse, setRepWeatherHse] = useState('Clear weather, zero safety incidents recorded. All linemen in full PPE.');
  const [repEquipment, setRepEquipment] = useState('');
  const [repPhotos, setRepPhotos] = useState<Array<{ name: string; url: string }>>([]);

  // Early Salary Request Form State
  const [showSalaryModal, setShowSalaryModal] = useState(false);
  const [salaryAmount, setSalaryAmount] = useState<number>(300000);
  const [salaryReason, setSalaryReason] = useState('');
  const [repaymentPlan, setRepaymentPlan] = useState('Deduct 100% from upcoming monthly payslip');

  // Material Request Form State
  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const [matProject, setMatProject] = useState('');
  const [matLocation, setMatLocation] = useState('');
  const [matUrgency, setMatUrgency] = useState<'NORMAL' | 'URGENT'>('NORMAL');
  const [matJustification, setMatJustification] = useState('');
  const [matItems, setMatItems] = useState<Array<{ item: string; quantity: number; unit: string; purpose: string }>>([
    { item: '', quantity: 1, unit: 'Pieces', purpose: '' }
  ]);

  // Field Expense / Per Diem Form State
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [expCategory, setExpCategory] = useState<ExpenseCategory>('FOOD_PER_DIEM');
  const [expDestination, setExpDestination] = useState('');
  const [expDays, setExpDays] = useState<number>(1);
  const [expAmount, setExpAmount] = useState<number>(60000);
  const [expDescription, setExpDescription] = useState('');
  const [expReceiptFile, setExpReceiptFile] = useState<string | null>(null);
  const [expReceiptName, setExpReceiptName] = useState<string | null>(null);

  // Safety Checklist State (Field feature fitting Rumuli's live-line & mining work)
  const [safetyPpe, setSafetyPpe] = useState(false);
  const [safetyPermit, setSafetyPermit] = useState(false);
  const [safetyEarth, setSafetyEarth] = useState(false);
  const [safetySigned, setSafetySigned] = useState(false);

  // Lightbox preview
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const loadWorkerData = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const [t, rep, s, m, e] = await Promise.all([
        PortalService.getTasks(currentUser.uid),
        PortalService.getProjectReports(currentUser.uid),
        PortalService.getSalaryRequests(currentUser.uid),
        PortalService.getMaterialRequests(currentUser.uid),
        PortalService.getFieldExpenses(currentUser.uid)
      ]);
      setTasks(t);
      setReports(rep);
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

  // Handle Profile Avatar Upload
  const handleAvatarFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && currentUser) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const dataUrl = reader.result as string;
        await PortalService.updateUserProfileImage(currentUser.uid, dataUrl);
        await refreshCurrentUser();
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Task Update
  const handleUpdateTaskStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showTaskUpdateModal) return;
    await PortalService.updateTaskStatus(showTaskUpdateModal.id, taskStatusChoice, taskNotes);
    setShowTaskUpdateModal(null);
    setTaskNotes('');
    await loadWorkerData();
  };

  // Handle Project Report Photos
  const handleReportPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setRepPhotos(prev => [...prev, { name: file.name, url: reader.result as string }]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Submit Project Report
  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!repProject || !repWorkCompleted) return;

    await PortalService.submitProjectReport({
      projectTitle: repProject,
      siteLocation: repLocation || 'Active Worksite',
      reportDate: repDate,
      workCompleted: repWorkCompleted,
      technicalChallenges: repChallenges,
      weatherHseConditions: repWeatherHse,
      equipmentUsed: repEquipment,
      photos: repPhotos
    });

    setShowReportModal(false);
    setRepProject('');
    setRepLocation('');
    setRepWorkCompleted('');
    setRepChallenges('');
    setRepEquipment('');
    setRepPhotos([]);
    await loadWorkerData();
  };

  // Submit Salary Advance
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

  // Handle Materials
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

  const handleSubmitMaterials = async (e: React.FormEvent) => {
    e.preventDefault();
    const validItems = matItems.filter(i => i.item.trim().length > 0);
    if (validItems.length === 0) return;

    await PortalService.requestMaterials({
      projectName: matProject || 'Field Worksite',
      siteLocation: matLocation || 'Site',
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

  // Submit Field Expense / Receipts
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

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED':
      case 'COMPLETED':
      case 'DISBURSED':
      case 'REVIEWED':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">APPROVED</span>;
      case 'IN_PROGRESS':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-300">IN PROGRESS</span>;
      case 'REJECTED':
      case 'ACTION_REQUIRED':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 border border-red-300">ACTION REQ / REJECTED</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">PENDING REVIEW</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F5F6] flex flex-col">
      <PortalHeader />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Profile Card Banner */}
        <div className="bg-[#10243A] text-white rounded-lg p-6 sm:p-8 shadow-md mb-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center space-x-4">
              
              {/* Profile Image with upload trigger */}
              <div className="relative group flex-shrink-0">
                <input
                  type="file"
                  ref={avatarInputRef}
                  accept="image/*"
                  onChange={handleAvatarFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  title="Click to change your profile picture"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-500/20 border-2 border-amber-500/50 flex items-center justify-center text-amber-brand text-2xl font-bold overflow-hidden shadow-inner relative group-hover:border-amber-brand transition-all"
                >
                  {currentUser.avatarUrl ? (
                    <img src={currentUser.avatarUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span>{currentUser.name.charAt(0)}</span>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity text-[10px] font-semibold text-white">
                    <Camera className="w-4 h-4 mb-0.5" />
                    <span>Upload</span>
                  </div>
                </button>
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
                  <span>Phone: {currentUser.phone}</span>
                  <span>•</span>
                  <span>Base Salary: <strong className="text-amber-brand">{currentUser.baseSalary.toLocaleString()} TZS</strong></span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setShowReportModal(true)}
                className="px-3.5 py-2 text-xs font-semibold rounded bg-amber-brand text-[#10243A] hover:bg-amber-hover transition-colors flex items-center space-x-1.5 shadow-sm font-bold"
              >
                <ClipboardCheck className="w-3.5 h-3.5" />
                <span>Submit Project Report</span>
              </button>
              <button
                type="button"
                onClick={() => setShowExpenseModal(true)}
                className="px-3 py-2 text-xs font-semibold rounded bg-[#1C3E61] text-white hover:bg-[#234d77] border border-[#2B5480] transition-colors flex items-center space-x-1.5"
              >
                <Receipt className="w-3.5 h-3.5 text-amber-brand" />
                <span>Claim Per Diem / Receipts</span>
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
              activeTab === 'tasks' ? 'border-amber-brand text-[#10243A]' : 'border-transparent text-gray-500 hover:text-[#10243A]'
            }`}
          >
            <Briefcase className="w-4 h-4 text-amber-brand" />
            <span>Assigned Tasks</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-gray-100 font-bold">{tasks.length}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('reports')}
            className={`py-3.5 px-4 font-bold text-xs uppercase tracking-wider border-b-2 transition-colors flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'reports' ? 'border-amber-brand text-[#10243A]' : 'border-transparent text-gray-500 hover:text-[#10243A]'
            }`}
          >
            <ClipboardCheck className="w-4 h-4 text-emerald-600" />
            <span>Project Field Reports</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-gray-100 font-bold">{reports.length}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('salary')}
            className={`py-3.5 px-4 font-bold text-xs uppercase tracking-wider border-b-2 transition-colors flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'salary' ? 'border-amber-brand text-[#10243A]' : 'border-transparent text-gray-500 hover:text-[#10243A]'
            }`}
          >
            <DollarSign className="w-4 h-4 text-emerald-700" />
            <span>Early Salary Advances</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-gray-100 font-bold">{salaryRequests.length}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('materials')}
            className={`py-3.5 px-4 font-bold text-xs uppercase tracking-wider border-b-2 transition-colors flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'materials' ? 'border-amber-brand text-[#10243A]' : 'border-transparent text-gray-500 hover:text-[#10243A]'
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
              activeTab === 'expenses' ? 'border-amber-brand text-[#10243A]' : 'border-transparent text-gray-500 hover:text-[#10243A]'
            }`}
          >
            <Receipt className="w-4 h-4 text-amber-600" />
            <span>Field Expenses & Per Diem</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-gray-100 font-bold">{expenses.length}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('safety')}
            className={`py-3.5 px-4 font-bold text-xs uppercase tracking-wider border-b-2 transition-colors flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'safety' ? 'border-amber-brand text-[#10243A]' : 'border-transparent text-gray-500 hover:text-[#10243A]'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-red-600" />
            <span>HSE Daily Safety Sign-Off</span>
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
                <p className="text-xs text-gray-500">Tasks officially assigned to you by Administration.</p>
              </div>
            </div>

            {tasks.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-lg border border-gray-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-gray-800">No Active Tasks Assigned</h3>
                <p className="text-xs text-gray-500 mt-1">When Corporate Administration assigns you a field project, it will appear here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tasks.map((task) => (
                  <div key={task.id} className="bg-white border border-gray-200 rounded-lg p-5 shadow-2xs flex flex-col justify-between hover:border-amber-brand/50 transition-colors">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono font-bold text-gray-500">{task.id}</span>
                        {renderStatusBadge(task.status)}
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
                          <strong className="block text-[10px] uppercase font-bold text-blue-700">Progress Note:</strong>
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
        {/* TAB 2: PROJECT FIELD REPORTS (NEW REQUESTED FEATURE) */}
        {/* ============================================================ */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-lg border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-[#10243A]">Project Field Execution Reports</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Submit daily or milestone engineering progress reports for assigned substation, live-line, mining, or crane operations with on-site photos.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowReportModal(true)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded flex items-center space-x-1.5 transition-colors shadow-sm flex-shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Submit Field Report</span>
              </button>
            </div>

            {reports.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-lg border border-gray-200">
                <ClipboardCheck className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-gray-800">No Reports Submitted Yet</h3>
                <p className="text-xs text-gray-500 mt-1">Submit your first field site report using the button above.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reports.map((rep) => (
                  <div key={rep.id} className="bg-white border border-gray-200 rounded-lg p-5 shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono font-bold text-gray-500">{rep.id}</span>
                        {renderStatusBadge(rep.status)}
                      </div>

                      <h3 className="font-bold text-sm text-[#10243A]">{rep.projectTitle}</h3>
                      <div className="flex items-center space-x-3 text-xs text-gray-500 mt-0.5">
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3 text-amber-brand" />
                          <span>{rep.siteLocation}</span>
                        </span>
                        <span>•</span>
                        <span>Date: <strong>{rep.reportDate}</strong></span>
                      </div>

                      <div className="mt-3 p-3 bg-gray-50 border border-gray-100 rounded text-xs space-y-2">
                        <div>
                          <strong className="text-gray-700 block">Work Completed:</strong>
                          <p className="text-gray-600 whitespace-pre-line mt-0.5">{rep.workCompleted}</p>
                        </div>
                        {rep.technicalChallenges && (
                          <div>
                            <strong className="text-amber-800 block">Site Challenges / Blockers:</strong>
                            <p className="text-gray-600 mt-0.5">{rep.technicalChallenges}</p>
                          </div>
                        )}
                        {rep.weatherHseConditions && (
                          <div>
                            <strong className="text-emerald-800 block">HSE & Weather Conditions:</strong>
                            <p className="text-gray-600 mt-0.5">{rep.weatherHseConditions}</p>
                          </div>
                        )}
                      </div>

                      {/* Photo Attachments */}
                      {rep.photos && rep.photos.length > 0 && (
                        <div className="mt-3">
                          <span className="text-[10px] font-bold uppercase text-gray-500 block mb-1">
                            Attached Site Evidence Photos ({rep.photos.length}):
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {rep.photos.map((ph, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setPreviewImage(ph.url)}
                                className="w-16 h-16 rounded border border-gray-200 overflow-hidden relative group hover:opacity-90"
                              >
                                <img src={ph.url} alt="" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                                  <Eye className="w-4 h-4 text-white" />
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-400 flex items-center justify-between">
                      <span>Submitted: {rep.submittedAt}</span>
                      {rep.reviewNotes && (
                        <span className="text-blue-700 font-bold">Admin Feedback: {rep.reviewNotes}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: EARLY SALARY ADVANCES */}
        {/* ============================================================ */}
        {activeTab === 'salary' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-lg border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-[#10243A]">Early Salary Advance Portal</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Emergency financial welfare. Eligible for an advance of up to 50% of monthly base salary ({Math.floor(currentUser.baseSalary * 0.5).toLocaleString()} TZS).
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

            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-2xs">
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
                        <th className="p-3 font-semibold">Feedback</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {salaryRequests.map((req) => (
                        <tr key={req.id} className="hover:bg-gray-50">
                          <td className="p-3 font-mono font-bold text-[#10243A]">{req.id}</td>
                          <td className="p-3 font-bold text-emerald-700">{req.requestedAmount.toLocaleString()} TZS</td>
                          <td className="p-3 text-gray-700 max-w-xs">{req.reason}</td>
                          <td className="p-3 text-gray-600">{req.repaymentTerms}</td>
                          <td className="p-3">{renderStatusBadge(req.status)}</td>
                          <td className="p-3 text-gray-500 italic">{req.reviewNotes || 'Under Review'}</td>
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
        {/* TAB 4: MATERIAL REQUISITIONS */}
        {/* ============================================================ */}
        {activeTab === 'materials' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-lg border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-[#10243A]">Worksite Material Requisition</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Request electrical conductors, transformers, switchgear, insulators, cement, and rigging cables.
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

            {materialRequests.length === 0 ? (
              <div className="bg-white p-8 text-center text-xs text-gray-500 rounded border">No material requests submitted.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {materialRequests.map((req) => (
                  <div key={req.id} className="bg-white border border-gray-200 rounded-lg p-5 shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono font-bold text-gray-500">{req.id}</span>
                        {renderStatusBadge(req.status)}
                      </div>

                      <h3 className="font-bold text-sm text-[#10243A]">{req.projectName}</h3>
                      <div className="text-xs text-gray-500 flex items-center space-x-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-amber-brand" />
                        <span>{req.siteLocation}</span>
                      </div>

                      <div className="mt-3 p-3 bg-gray-50 border border-gray-100 rounded">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-1">Items:</span>
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
                      {req.reviewNotes && <span className="text-blue-700 font-semibold">{req.reviewNotes}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 5: FIELD PER DIEM & EXPENSES */}
        {/* ============================================================ */}
        {activeTab === 'expenses' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-lg border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-[#10243A]">Field Allowances, Per Diem & Receipts</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  When deployed on far assignments, claim daily food subsistence, lodge/sleep invoices, transit fares, and fuel.
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

            {expenses.length === 0 ? (
              <div className="bg-white p-8 text-center text-xs text-gray-500 rounded border">No field expenses recorded.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {expenses.map((exp) => (
                  <div key={exp.id} className="bg-white border border-gray-200 rounded-lg p-5 shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono font-bold text-gray-500">{exp.id}</span>
                        {renderStatusBadge(exp.status)}
                      </div>

                      <div className="text-lg font-black text-[#10243A]">{exp.amount.toLocaleString()} TZS</div>
                      <p className="text-xs text-gray-600 mt-1">{exp.description}</p>

                      <div className="mt-3 text-xs text-gray-500 space-y-1">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3.5 h-3.5 text-amber-brand" />
                          <span>{exp.destination}</span>
                        </div>
                        {exp.daysCount && (
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                            <span>Duration: {exp.daysCount} Days on site</span>
                          </div>
                        )}
                      </div>

                      {exp.receiptDataUrl && (
                        <div className="mt-3 p-2 bg-gray-50 border border-gray-200 rounded flex items-center justify-between">
                          <span className="text-xs text-gray-700 truncate">{exp.receiptFileName || 'Attached Receipt'}</span>
                          <button
                            type="button"
                            onClick={() => setPreviewImage(exp.receiptDataUrl || null)}
                            className="px-2 py-0.5 text-xs text-blue-700 font-semibold"
                          >
                            Inspect
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                      <span>{exp.submittedAt}</span>
                      {exp.reviewNotes && <span className="text-emerald-700 font-bold">{exp.reviewNotes}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 6: HSE ZERO-HARM DAILY SAFETY SIGN-OFF */}
        {/* ============================================================ */}
        {activeTab === 'safety' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-2xs">
              <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-gray-100">
                <ShieldCheck className="w-8 h-8 text-red-600" />
                <div>
                  <h2 className="text-base font-bold text-[#10243A]">Daily Live-Line & Worksite Safety Sign-Off</h2>
                  <p className="text-xs text-gray-500">
                    Mandatory Zero-Harm protocol before commencing high-voltage live line maintenance, crane lifts, or mineral leaching works.
                  </p>
                </div>
              </div>

              {safetySigned ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
                  <h3 className="text-sm font-bold text-emerald-900">Safety Verification Complete</h3>
                  <p className="text-xs text-emerald-700 mt-1">
                    You have digitally signed your Daily Toolbox & PPE Verification for today. Work authorized under Zero-Harm standards.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-w-xl">
                  <div className="space-y-2 text-xs">
                    <label className="flex items-start space-x-2.5 p-3 bg-gray-50 rounded border cursor-pointer">
                      <input
                        type="checkbox"
                        checked={safetyPpe}
                        onChange={(e) => setSafetyPpe(e.target.checked)}
                        className="mt-0.5 w-4 h-4 text-emerald-600 rounded"
                      />
                      <div>
                        <strong className="text-gray-900 block">Personal Protective Equipment (PPE) Inspected:</strong>
                        <span className="text-gray-600">Arc-flash safety shield, dielectric insulating gloves, safety boots, and fall-arrest harness verified.</span>
                      </div>
                    </label>

                    <label className="flex items-start space-x-2.5 p-3 bg-gray-50 rounded border cursor-pointer">
                      <input
                        type="checkbox"
                        checked={safetyPermit}
                        onChange={(e) => setSafetyPermit(e.target.checked)}
                        className="mt-0.5 w-4 h-4 text-emerald-600 rounded"
                      />
                      <div>
                        <strong className="text-gray-900 block">Permit to Work & Isolation Verified:</strong>
                        <span className="text-gray-600">Clearance received from site supervisor and client utility engineers before work commencement.</span>
                      </div>
                    </label>

                    <label className="flex items-start space-x-2.5 p-3 bg-gray-50 rounded border cursor-pointer">
                      <input
                        type="checkbox"
                        checked={safetyEarth}
                        onChange={(e) => setSafetyEarth(e.target.checked)}
                        className="mt-0.5 w-4 h-4 text-emerald-600 rounded"
                      />
                      <div>
                        <strong className="text-gray-900 block">Earthing & Grounding Tested:</strong>
                        <span className="text-gray-600">Portable earth leads clamped and circuit confirmed dead or live-line distance protocols strictly observed.</span>
                      </div>
                    </label>
                  </div>

                  <button
                    type="button"
                    disabled={!safetyPpe || !safetyPermit || !safetyEarth}
                    onClick={() => setSafetySigned(true)}
                    className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded text-xs transition-colors disabled:opacity-40"
                  >
                    Commit & Sign Daily Safety Verification
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      {/* ============================================================ */}
      {/* MODAL: SUBMIT PROJECT REPORT */}
      {/* ============================================================ */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <ClipboardCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-bold text-[#10243A]">Submit Project Field Execution Report</h3>
              </div>
              <button onClick={() => setShowReportModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReport} className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Project Name</label>
                  <input
                    type="text"
                    value={repProject}
                    onChange={(e) => setRepProject(e.target.value)}
                    placeholder="e.g. Geita Gold Leaching Plant"
                    required
                    className="w-full border border-gray-300 rounded p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Site Location</label>
                  <input
                    type="text"
                    value={repLocation}
                    onChange={(e) => setRepLocation(e.target.value)}
                    placeholder="e.g. Geita Site Block B"
                    required
                    className="w-full border border-gray-300 rounded p-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Report Date</label>
                <input
                  type="date"
                  value={repDate}
                  onChange={(e) => setRepDate(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded p-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Work Completed & Milestones Achieved Today</label>
                <textarea
                  rows={3}
                  value={repWorkCompleted}
                  onChange={(e) => setRepWorkCompleted(e.target.value)}
                  placeholder="Detail operations conducted today (e.g. transformer bushings torqued, cable terminations completed, 400m line strung, vat concrete pour inspected)..."
                  required
                  className="w-full border border-gray-300 rounded p-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Site Challenges / Blockers Encountered</label>
                <textarea
                  rows={2}
                  value={repChallenges}
                  onChange={(e) => setRepChallenges(e.target.value)}
                  placeholder="e.g. Soil condition required extra anchor depth; heavy rain delayed crane lift by 2 hours..."
                  className="w-full border border-gray-300 rounded p-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Weather & HSE Status</label>
                  <input
                    type="text"
                    value={repWeatherHse}
                    onChange={(e) => setRepWeatherHse(e.target.value)}
                    placeholder="e.g. Clear, zero incidents"
                    className="w-full border border-gray-300 rounded p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Machinery & Tools Utilized</label>
                  <input
                    type="text"
                    value={repEquipment}
                    onChange={(e) => setRepEquipment(e.target.value)}
                    placeholder="e.g. UNIC 4260 crane, Megger tester"
                    className="w-full border border-gray-300 rounded p-2 text-xs"
                  />
                </div>
              </div>

              {/* Attach Site Photos */}
              <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded">
                <label className="block text-xs font-bold text-emerald-900 mb-1 flex items-center space-x-1.5">
                  <Camera className="w-3.5 h-3.5" />
                  <span>Attach Site Execution Photos (Multiple Allowed)</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleReportPhotoUpload}
                  className="w-full text-xs text-gray-700 file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#10243A] file:text-white"
                />
                {repPhotos.length > 0 && (
                  <div className="mt-2 text-xs text-emerald-800 font-semibold">
                    Attached {repPhotos.length} site photos ready for upload.
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="px-3 py-1.5 text-xs text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-600 text-white rounded text-xs font-bold hover:bg-emerald-700"
                >
                  Submit Field Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: UPDATE TASK STATUS */}
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
                <label className="block text-xs font-semibold text-gray-700 mb-1">Field Progress Notes</label>
                <textarea
                  rows={3}
                  value={taskNotes}
                  onChange={(e) => setTaskNotes(e.target.value)}
                  placeholder="e.g. Conducted transformer oil test. Ready for energization."
                  className="w-full border border-gray-300 rounded p-2 text-xs"
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
      {/* MODAL: EARLY SALARY REQUEST */}
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
                <label className="block text-xs font-semibold text-gray-700 mb-1">Reason for Early Payout</label>
                <textarea
                  rows={2}
                  value={salaryReason}
                  onChange={(e) => setSalaryReason(e.target.value)}
                  placeholder="e.g. Urgent family hospitalization deposit..."
                  required
                  className="w-full border border-gray-300 rounded p-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Repayment Terms</label>
                <select
                  value={repaymentPlan}
                  onChange={(e) => setRepaymentPlan(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2 text-xs"
                >
                  <option value="Deduct 100% from upcoming monthly payslip">Deduct 100% from upcoming monthly payslip</option>
                  <option value="Split 50% across next two payroll cycles">Split 50% across next two payroll cycles</option>
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
                  Submit for Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: MATERIAL REQUISITION */}
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
                    placeholder="e.g. Block B"
                    required
                    className="w-full border border-gray-300 rounded p-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Urgency</label>
                <select
                  value={matUrgency}
                  onChange={(e) => setMatUrgency(e.target.value as any)}
                  className="w-full border border-gray-300 rounded p-2 text-xs"
                >
                  <option value="NORMAL">NORMAL DELIVERY</option>
                  <option value="URGENT">URGENT (CRITICAL PATH)</option>
                </select>
              </div>

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
      {/* MODAL: FIELD PER DIEM & EXPENSE RECEIPT CLAIM */}
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
                <label className="block text-xs font-semibold text-gray-700 mb-1">Category</label>
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
                  placeholder="e.g. Geita Gold Mine Site"
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
                  placeholder="e.g. 5 days food per diem + attached lodge invoice."
                  required
                  className="w-full border border-gray-300 rounded p-2 text-xs"
                />
              </div>

              <div className="p-3 bg-amber-50/60 border border-amber-200 rounded">
                <label className="block text-xs font-bold text-[#10243A] mb-1 flex items-center space-x-1.5">
                  <Upload className="w-3.5 h-3.5 text-amber-brand" />
                  <span>Attach Expenditure Receipt / Hotel Invoice</span>
                </label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleReceiptUpload}
                  className="w-full text-xs text-gray-700 file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#10243A] file:text-white"
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

      {/* Lightbox Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-xl w-full p-4 relative">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute right-3 top-3 bg-gray-100 hover:bg-gray-200 p-1 rounded-full text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h4 className="text-sm font-bold text-[#10243A] mb-3">Audited Attachment Document</h4>
            <div className="max-h-[70vh] overflow-auto flex items-center justify-center bg-gray-100 rounded p-2">
              <img src={previewImage} alt="Preview" className="max-w-full max-h-[65vh] object-contain rounded" />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
