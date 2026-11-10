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

// Seed ONLY the master admin account requested by user
const MASTER_ADMIN = {
  uid: 'admin-master',
  employeeId: 'RUM-ADM-001',
  name: 'Rumuli Executive Admin',
  email: 'admin@rumuli.com',
  password: 'rumuli2026',
  phone: '+255 784 123 456',
  role: 'ADMIN',
  department: 'Executive Technical Operations',
  designation: 'Managing Director & Principal Executive Engineer',
  baseSalary: 10000000,
  status: 'ACTIVE',
  joinedDate: '2026-01-01',
  avatarUrl: ''
};

async function seed() {
  console.log('Seeding Master Admin to Live Firestore (Project: rumuli)...');

  // Seed Admin user
  await setDoc(doc(db, 'users', MASTER_ADMIN.uid), MASTER_ADMIN);
  console.log('✓ Master Admin document created in users/admin-master: admin@rumuli.com / rumuli2026');

  // Also seed initial system log
  const systemLog = {
    id: `LOG-${Date.now()}`,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    userUid: MASTER_ADMIN.uid,
    userName: MASTER_ADMIN.name,
    userRole: 'ADMIN',
    action: 'SYSTEM_INITIALIZED',
    details: 'Master Admin account initialized. Clean operational state active with zero sample/demo records.',
    category: 'AUTH'
  };
  await setDoc(doc(db, 'activity_logs', systemLog.id), systemLog);
  console.log('✓ System activity log seeded');

  console.log('All Firebase collections cleaned of demo data and initialized successfully!');
}

seed().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
