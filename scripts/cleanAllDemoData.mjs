import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';

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

const COLLECTIONS_TO_PURGE = [
  'tasks',
  'salary_requests',
  'field_expenses',
  'material_requests',
  'project_reports',
  'safety_signoffs',
  'activity_logs'
];

async function cleanFirestore() {
  console.log('Purging all demo data from Firestore...');

  for (const colName of COLLECTIONS_TO_PURGE) {
    const snap = await getDocs(collection(db, colName));
    console.log(`Found ${snap.size} documents in '${colName}'`);
    for (const d of snap.docs) {
      await deleteDoc(doc(db, colName, d.id));
    }
    console.log(`✓ Purged all documents in '${colName}'`);
  }

  // Purge any users except admin-master
  const usersSnap = await getDocs(collection(db, 'users'));
  console.log(`Found ${usersSnap.size} documents in 'users'`);
  for (const d of usersSnap.docs) {
    if (d.id !== 'admin-master') {
      await deleteDoc(doc(db, 'users', d.id));
      console.log(`Deleted demo user document: ${d.id}`);
    }
  }

  // Ensure admin-master exists
  const masterAdmin = {
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
  };

  await setDoc(doc(db, 'users', 'admin-master'), masterAdmin);
  console.log('✓ Master Admin document confirmed in users/admin-master');

  // Insert single clean log
  const systemLog = {
    id: `LOG-${Date.now()}`,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    userUid: 'admin-master',
    userName: 'Executive Management',
    userRole: 'ADMIN',
    action: 'PORTAL_CLEAN_INITIALIZED',
    details: 'Master administration established. Clean operational state active with zero demo data.',
    category: 'AUTH'
  };
  await setDoc(doc(db, 'activity_logs', systemLog.id), systemLog);
  console.log('✓ Single clean activity log created');

  console.log('COMPLETE: All demo data successfully eradicated from Firebase!');
}

cleanFirestore().catch(err => {
  console.error('Purge failed:', err);
  process.exit(1);
});
