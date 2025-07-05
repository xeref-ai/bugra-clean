
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAnalytics, type Analytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdQ3cAKrsbCceXbvg-GDxtP3J0_ppL5ek",
  authDomain: "xerefai.firebaseapp.com",
  projectId: "xerefai",
  storageBucket: "xerefai.firebasestorage.app",
  messagingSenderId: "430418545183",
  appId: "1:430418545183:web:8d86cbe5405b6fa6a1e32a",
  measurementId: "G-WHWW3FVER7"
};

// A helper flag to check if Firebase is configured.
// This is useful for gracefully handling environments where secrets might be missing.
export const isFirebaseEnabled =
  !!firebaseConfig.apiKey &&
  !!firebaseConfig.projectId &&
  !!firebaseConfig.appId;

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let analytics: Analytics | null = null;

if (isFirebaseEnabled) {
  // In a Next.js environment, we need to check if the app is already initialized
  // to prevent errors during hot-reloading.
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  // Initialize the services this app needs
  auth = getAuth(app);
  db = getFirestore(app);
  
  // Initialize Analytics only on the client side
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
}

export { app, auth, db, analytics };
