import { UserProfile, WorkerTask, EarlySalaryRequest, MaterialRequest, FieldExpense, ActivityLog } from '../types/portal';

export const INITIAL_USERS: UserProfile[] = [
  {
    uid: 'admin-001',
    employeeId: 'RUM-ADM-001',
    name: 'Eng. Joseph Rumuli',
    email: 'admin@rumuli.co.tz',
    phone: '+255 784 123 456',
    role: 'ADMIN',
    department: 'Executive Technical Operations',
    designation: 'Managing Director & Principal Executive Engineer',
    baseSalary: 6500000,
    status: 'ACTIVE',
    joinedDate: '2016-04-12',
    avatarUrl: '/images/img-wa0052.jpg'
  },
  {
    uid: 'worker-102',
    employeeId: 'RUM-ENG-102',
    name: 'Baraka M. Mwamba',
    email: 'baraka.mwamba@rumuli.co.tz',
    phone: '+255 754 987 654',
    role: 'WORKER',
    department: 'Substations & Live-Line Power',
    designation: 'Senior Substation & Live-Line Engineer',
    baseSalary: 2800000,
    status: 'ACTIVE',
    joinedDate: '2019-02-15',
    avatarUrl: '/images/img-wa0054.jpg'
  },
  {
    uid: 'worker-204',
    employeeId: 'RUM-TEC-204',
    name: 'Salim K. Kibona',
    email: 'salim.kibona@rumuli.co.tz',
    phone: '+255 713 456 789',
    role: 'WORKER',
    department: 'Heavy Plant & Transport Fleet',
    designation: 'Mobile Boom Crane & Rigging Specialist',
    baseSalary: 2200000,
    status: 'ACTIVE',
    joinedDate: '2020-08-01',
    avatarUrl: '/images/img-wa0002.jpg'
  },
  {
    uid: 'worker-308',
    employeeId: 'RUM-ENG-308',
    name: 'Neema E. Mushi',
    email: 'neema.mushi@rumuli.co.tz',
    phone: '+255 768 234 567',
    role: 'WORKER',
    department: 'Mining Infrastructure & Mineral Processing',
    designation: 'Mineral Processing & Leaching Vat Engineer',
    baseSalary: 3100000,
    status: 'ACTIVE',
    joinedDate: '2021-06-10',
    avatarUrl: '/images/img-wa0026.jpg'
  }
];

export const INITIAL_TASKS: WorkerTask[] = [
  {
    id: 'TSK-2026-001',
    title: 'Pre-energization dielectric breakdown testing on 33/0.4kV transformer',
    project: 'Gold Leaching Plant Electrification',
    location: 'Geita Mining Belt, Site Block B',
    priority: 'CRITICAL',
    status: 'IN_PROGRESS',
    assignedToUid: 'worker-102',
    assignedToName: 'Baraka M. Mwamba',
    assignedBy: 'Eng. Joseph Rumuli',
    deadline: '2026-11-15',
    description: 'Execute oil sampling, winding resistance, and insulation resistance tests on the 1000kVA transformer before final switchgear energization.',
    completionNotes: 'Initial winding insulation test completed at 2.5G Ohm. Proceeding with oil breakdown test.',
    createdAt: '2026-11-08 09:30',
    updatedAt: '2026-11-10 14:15'
  },
  {
    id: 'TSK-2026-002',
    title: 'Reinforced concrete circular leaching vat #3 structural hydro-testing',
    project: 'Mineral Processing Infrastructure',
    location: 'Lake Zone Mineral Processing Facility',
    priority: 'HIGH',
    status: 'PENDING',
    assignedToUid: 'worker-308',
    assignedToName: 'Neema E. Mushi',
    assignedBy: 'Eng. Joseph Rumuli',
    deadline: '2026-11-18',
    description: 'Fill circular vat #3 with water to test hydraulic containment and seal integrity of agitator base anchors before slurry injection.',
    createdAt: '2026-11-09 11:00',
    updatedAt: '2026-11-09 11:00'
  },
  {
    id: 'TSK-2026-003',
    title: 'UNIC 4260 boom crane hydraulic seal inspection & rigging recertification',
    project: 'Fleet Maintenance & Site Safety',
    location: 'Central Plant Yard, Dar es Salaam',
    priority: 'MEDIUM',
    status: 'PENDING',
    assignedToUid: 'worker-204',
    assignedToName: 'Salim K. Kibona',
    assignedBy: 'Eng. Joseph Rumuli',
    deadline: '2026-11-20',
    description: 'Conduct 250-hour scheduled hydraulic oil flush, test outrigger pressure sensors, and inspect wire rope slings for 33kV transformer lifts.',
    createdAt: '2026-11-07 08:00',
    updatedAt: '2026-11-07 08:00'
  }
];

export const INITIAL_SALARY_REQUESTS: EarlySalaryRequest[] = [
  {
    id: 'SAL-REQ-101',
    workerUid: 'worker-102',
    workerName: 'Baraka M. Mwamba',
    employeeId: 'RUM-ENG-102',
    department: 'Substations & Live-Line Power',
    requestedAmount: 750000,
    currentSalary: 2800000,
    reason: 'Urgent family hospitalization medical bills requiring upfront hospital admission deposit.',
    repaymentTerms: 'Deduct 100% (750,000 TZS) from upcoming end-of-month payroll cycle.',
    status: 'PENDING',
    requestedAt: '2026-11-09 16:40'
  },
  {
    id: 'SAL-REQ-102',
    workerUid: 'worker-204',
    workerName: 'Salim K. Kibona',
    employeeId: 'RUM-TEC-204',
    department: 'Heavy Plant & Transport Fleet',
    requestedAmount: 500000,
    currentSalary: 2200000,
    reason: 'Advance for children secondary school semester fee payment deadline.',
    repaymentTerms: 'Split deduction of 250,000 TZS across the next two consecutive monthly payslips.',
    status: 'APPROVED',
    requestedAt: '2026-10-28 10:15',
    reviewedBy: 'Eng. Joseph Rumuli',
    reviewedAt: '2026-10-29 09:00',
    reviewNotes: 'Approved as per staff welfare policy. Disbursed via corporate M-Pesa account.'
  }
];

export const INITIAL_MATERIAL_REQUESTS: MaterialRequest[] = [
  {
    id: 'MAT-REQ-201',
    workerUid: 'worker-308',
    workerName: 'Neema E. Mushi',
    employeeId: 'RUM-ENG-308',
    projectName: 'Gold Processing Plant Electrification & Leaching Vat Construction',
    siteLocation: 'Geita Mining Site, Vat Block 2',
    urgency: 'URGENT',
    items: [
      { item: '33kV XLPE Copper Core Cable 3x185mm²', quantity: 450, unit: 'Meters', purpose: 'Main feed connection from step-down plinth to VOLEX MCC' },
      { item: 'Heat-Shrink Outdoor Termination Kits (33kV)', quantity: 6, unit: 'Sets', purpose: 'Bushing connections at transformer secondary' },
      { item: 'Copper Earth Tape 25x3mm', quantity: 120, unit: 'Meters', purpose: 'Perimeter earthing mat around vat structure' },
      { item: 'Heavy-Duty Slurry Agitator Coupling Bolts M24', quantity: 48, unit: 'Pieces', purpose: 'Flange fastening on vat drive shaft' }
    ],
    justification: 'Critical path materials required to energize the VOLEX slurry motor starters and start the leaching cycle on schedule.',
    status: 'PENDING',
    requestedAt: '2026-11-09 11:20'
  },
  {
    id: 'MAT-REQ-202',
    workerUid: 'worker-102',
    workerName: 'Baraka M. Mwamba',
    employeeId: 'RUM-ENG-102',
    projectName: 'Lugoba 33kV Line & Transformer Installation',
    siteLocation: 'Coast (Pwani) Region',
    urgency: 'NORMAL',
    items: [
      { item: 'ACSR Wolf Conductor', quantity: 1200, unit: 'Meters', purpose: 'Overhead span replacement' },
      { item: 'Polymer Suspension Insulators 33kV', quantity: 24, unit: 'Units', purpose: 'Tension tower hardware' },
      { item: 'Drop-Out Fuse Assemblies with 30A links', quantity: 3, unit: 'Sets', purpose: 'Transformer protection branch' }
    ],
    justification: 'Required for completing the final 1.3km distribution line extension before TANESCO inspection.',
    status: 'APPROVED',
    requestedAt: '2026-10-25 14:00',
    reviewedBy: 'Eng. Joseph Rumuli',
    reviewedAt: '2026-10-26 08:30',
    reviewNotes: 'Approved. Dispatched from Dar es Salaam central warehouse.'
  }
];

export const INITIAL_FIELD_EXPENSES: FieldExpense[] = [
  {
    id: 'EXP-REQ-301',
    workerUid: 'worker-102',
    workerName: 'Baraka M. Mwamba',
    employeeId: 'RUM-ENG-102',
    category: 'FOOD_PER_DIEM',
    destination: 'Far Work Assignment: Geita Gold Mining Belt (Substation Transformer Energization)',
    daysCount: 6,
    amount: 360000, // 60,000 TZS per day food per diem
    description: 'Daily food subsistence allowance (Per Diem) for lead substation engineer deployed for 6 days on-site at Geita gold extraction facility.',
    receiptFileName: 'food_allowance_schedule_geita.pdf',
    status: 'PENDING',
    submittedAt: '2026-11-09 17:15'
  },
  {
    id: 'EXP-REQ-302',
    workerUid: 'worker-102',
    workerName: 'Baraka M. Mwamba',
    employeeId: 'RUM-ENG-102',
    category: 'ACCOMMODATION_SLEEP',
    destination: 'Geita Mining Town (Overnight Stay for High-Voltage Testing)',
    daysCount: 5,
    amount: 450000, // 90,000 TZS per night lodge
    description: 'Lodging and accommodation invoice at Golden Crest Lodge Geita during non-stop overnight transformer oil dielectric sampling and terminal wiring.',
    receiptDataUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    receiptFileName: 'hotel_tax_invoice_receipt_0482.jpg',
    status: 'PENDING',
    submittedAt: '2026-11-09 17:22'
  },
  {
    id: 'EXP-REQ-303',
    workerUid: 'worker-204',
    workerName: 'Salim K. Kibona',
    employeeId: 'RUM-TEC-204',
    category: 'TRAVEL_TRANSPORT',
    destination: 'Inter-regional Mobilization: Dar es Salaam to Geita Site',
    amount: 180000,
    description: 'Long-distance express transit ticket and equipment baggage surcharge for crane technician mobilization.',
    receiptDataUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    receiptFileName: 'transit_ticket_receipt_dar_geita.jpg',
    status: 'APPROVED',
    submittedAt: '2026-10-30 08:10',
    reviewedBy: 'Eng. Joseph Rumuli',
    reviewedAt: '2026-10-30 11:30',
    reviewNotes: 'Verified against travel route order. Reimbursed.'
  }
];

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'LOG-001',
    workerUid: 'worker-102',
    workerName: 'Baraka M. Mwamba',
    action: 'Submitted Field Accommodation & Food Allowance Claim',
    details: 'Claimed 810,000 TZS total for 6-day Geita mining plant deployment with attached hotel invoice.',
    timestamp: '2026-11-09 17:22',
    category: 'EXPENSE'
  },
  {
    id: 'LOG-002',
    workerUid: 'worker-102',
    workerName: 'Baraka M. Mwamba',
    action: 'Requested Salary Advance',
    details: 'Requested 750,000 TZS salary advance for family emergency (100% deduction terms).',
    timestamp: '2026-11-09 16:40',
    category: 'SALARY'
  },
  {
    id: 'LOG-003',
    workerUid: 'worker-308',
    workerName: 'Neema E. Mushi',
    action: 'Submitted Urgent Material Requisition',
    details: 'Requested 450m 33kV XLPE copper cable, termination kits, and earthing tape for leaching vat block.',
    timestamp: '2026-11-09 11:20',
    category: 'MATERIALS'
  },
  {
    id: 'LOG-004',
    workerUid: 'worker-102',
    workerName: 'Baraka M. Mwamba',
    action: 'Updated Task Status to IN_PROGRESS',
    details: 'Task TSK-2026-001: Pre-energization dielectric test at Geita site marked in progress.',
    timestamp: '2026-11-08 14:15',
    category: 'TASK'
  },
  {
    id: 'LOG-005',
    workerUid: 'admin-001',
    workerName: 'Eng. Joseph Rumuli',
    action: 'Created Worker Profile & Assigned Engineering Responsibilities',
    details: 'Registered Neema E. Mushi (RUM-ENG-308) in Mining Infrastructure & Mineral Processing.',
    timestamp: '2026-11-07 10:00',
    category: 'ADMIN'
  }
];
