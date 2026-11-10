import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCYycXN7SQx_mlB6DVz5W11ltNBBsG6m08",
  authDomain: "rumuli.firebaseapp.com",
  projectId: "rumuli",
  storageBucket: "rumuli.firebasestorage.app",
  messagingSenderId: "341677512493",
  appId: "1:341677512493:web:aeed35d25c1e8e84bb25a4",
  measurementId: "G-B7XB6CGL81"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const USERS = [
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

const TASKS = [
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

const SALARY_REQUESTS = [
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

const MATERIAL_REQUESTS = [
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
  }
];

const EXPENSES = [
  {
    id: 'EXP-REQ-301',
    workerUid: 'worker-102',
    workerName: 'Baraka M. Mwamba',
    employeeId: 'RUM-ENG-102',
    category: 'FOOD_PER_DIEM',
    destination: 'Far Work Assignment: Geita Gold Mining Belt (Substation Transformer Energization)',
    daysCount: 6,
    amount: 360000,
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
    amount: 450000,
    description: 'Lodging and accommodation invoice at Golden Crest Lodge Geita during non-stop overnight transformer oil dielectric sampling and terminal wiring.',
    receiptDataUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    receiptFileName: 'hotel_tax_invoice_receipt_0482.jpg',
    status: 'PENDING',
    submittedAt: '2026-11-09 17:22'
  }
];

const LOGS = [
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
    workerUid: 'admin-001',
    workerName: 'Eng. Joseph Rumuli',
    action: 'Database Initialized on Firebase Cloud Firestore',
    details: 'Corporate schema, security rules, and initial collections successfully created.',
    timestamp: '2026-11-10 20:50',
    category: 'ADMIN'
  }
];

async function seed() {
  console.log('Seeding Cloud Firestore for project "rumuli"...');

  for (const u of USERS) {
    await setDoc(doc(db, 'users', u.uid), u);
    console.log(`✓ Seeded user: ${u.name} (${u.role})`);
  }

  for (const t of TASKS) {
    await setDoc(doc(db, 'tasks', t.id), t);
    console.log(`✓ Seeded task: ${t.id} - ${t.title}`);
  }

  for (const s of SALARY_REQUESTS) {
    await setDoc(doc(db, 'salary_advances', s.id), s);
    console.log(`✓ Seeded salary request: ${s.id}`);
  }

  for (const m of MATERIAL_REQUESTS) {
    await setDoc(doc(db, 'material_requests', m.id), m);
    console.log(`✓ Seeded material request: ${m.id}`);
  }

  for (const e of EXPENSES) {
    await setDoc(doc(db, 'field_expenses', e.id), e);
    console.log(`✓ Seeded field expense: ${e.id}`);
  }

  for (const l of LOGS) {
    await setDoc(doc(db, 'activity_logs', l.id), l);
    console.log(`✓ Seeded activity log: ${l.id}`);
  }

  console.log('\n🎉 ALL COLLECTIONS SUCCESSFULLY SEEDED IN FIREBASE CLOUD FIRESTORE!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
});
