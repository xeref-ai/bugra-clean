
// src/app/api/users/route.ts
import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();
    if (!token) {
      return NextResponse.json({ error: 'Authorization token not found' }, { status: 401 });
    }
    if (!adminAuth || !adminDb) {
      console.warn('Firebase Admin SDK not initialized. Skipping user profile creation. Please set FIREBASE_SERVICE_ACCOUNT_KEY in your environment variables.');
      return NextResponse.json({ message: 'Admin SDK not configured, skipping profile creation.' }, { status: 200 });
    }

    const decodedToken = await adminAuth.verifyIdToken(token);
    const { uid, email, name, picture } = decodedToken;

    const userRef = adminDb.collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      // User is new, create a profile in Firestore
      await userRef.set({
        uid,
        email,
        displayName: name || null,
        photoURL: picture || null,
        createdAt: new Date().toISOString(),
        plan: 'Free', // Default plan
      });
      return NextResponse.json({ message: 'User profile created successfully' }, { status: 201 });
    } else {
      // User already exists
      return NextResponse.json({ message: 'User already exists' }, { status: 200 });
    }
  } catch (error: any) {
    console.error('Error in user creation endpoint:', error);
    let errorMessage = 'Internal Server Error';
    if (error.code === 'auth/id-token-expired') {
        errorMessage = 'Authentication token has expired. Please sign in again.';
        return NextResponse.json({ error: errorMessage }, { status: 401 });
    }
    return NextResponse.json({ error: errorMessage, details: error.message }, { status: 500 });
  }
}
