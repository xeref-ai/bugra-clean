
// src/lib/firebase.ts
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAnalytics, type Analytics, isSupported } from 'firebase/analytics';
import { getPerformance, type FirebasePerformance } from 'firebase/performance';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const isFirebaseEnabled = !!firebaseConfig.apiKey;

// --- Core App Initialization (Runs on Server and Client) ---
let app: FirebaseApp;
if (isFirebaseEnabled) {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
}

export const auth = getAuth(app);
export const db = getFirestore(app);

// --- Client-Side Service Initialization ---
let analytics: Analytics | undefined;
let perf: FirebasePerformance | undefined;
let isClientInitialized = false;

// This function initializes services and ensures it only runs once.
export const initializeClientServices = async () => {
  if (typeof window !== 'undefined' && !isClientInitialized) {
    isClientInitialized = true; // Mark as initialized to prevent re-running

    // Enable offline persistence first
    await enableIndexedDbPersistence(db).catch(console.warn);
    
    // Check if Analytics is supported by the browser and then initialize
    if (await isSupported()) {
      analytics = getAnalytics(app);
      perf = getPerformance(app);
    }
  }
};

// **The Fix**: A getter function to safely access initialized services.
// Components will call this function instead of importing 'analytics' directly.
export const getFirebaseServices = () => ({
  analytics,
  perf,
});
