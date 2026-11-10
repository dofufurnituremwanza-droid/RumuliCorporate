import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics';

// Official Rumuli Corporate Firebase Configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyCYycXN7SQx_mlB6DVz5W11ltNBBsG6m08',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'rumuli.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'rumuli',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'rumuli.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '341677512493',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:341677512493:web:aeed35d25c1e8e84bb25a4',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-B7XB6CGL81'
};

export const isFirebaseConfigured: boolean = true;

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;
let analytics: Analytics | null = null;

try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);

  if (typeof window !== 'undefined') {
    isSupported().then((supported) => {
      if (supported && app) {
        analytics = getAnalytics(app);
      }
    }).catch(() => {});
  }

  console.info('✓ Rumuli Corporate: Connected to Firebase Cloud Backend (Project: "rumuli")');
} catch (err) {
  console.warn('Firebase initialization notice:', err);
}

export { app, auth, db, storage, analytics };
