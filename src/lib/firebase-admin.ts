
import * as admin from 'firebase-admin';
import { applicationDefault } from 'firebase-admin/app';

let db: admin.firestore.Firestore;

if (!admin.apps.length) {
  try {
    // This is the key change. In a Google Cloud environment (like App Hosting)
    // or a local environment with `gcloud auth application-default login`,
    // the SDK will automatically find and use the correct credentials.
    admin.initializeApp({
      credential: applicationDefault(),
    });
    console.log("Firebase Admin SDK initialized with Application Default Credentials.");
  } catch (error) {
    console.error("Firebase Admin initialization error:", error);
    // This error will now be more informative if your gcloud auth is missing.
  }
}

db = admin.firestore();

export { db };
