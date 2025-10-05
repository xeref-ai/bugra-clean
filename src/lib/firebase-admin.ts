
import * as admin from 'firebase-admin';

let db: admin.firestore.Firestore;

if (!admin.apps.length) {
  try {
    // When running on Google Cloud (like App Hosting), the SDK can
    // often find the default service account credentials automatically.
    // For local development and explicit configuration, we'll check for
    // a specific environment variable.
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
      ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
      : undefined;

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("Firebase Admin SDK initialized successfully.");
  } catch (error) {
    console.error("Firebase Admin initialization error:", error);
  }
}

db = admin.firestore();

export { db };
