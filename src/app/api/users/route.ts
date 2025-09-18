
// src/app/api/users/route.ts
import { NextResponse } from 'next/server';
import { auth as adminAuth } from 'firebase-admin';
import { initializeApp, getApps, App } from 'firebase-admin/app';
import { credential } from 'firebase-admin';

// Initialize Firebase Admin SDK
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
  : null;

if (!getApps().length && serviceAccount) {
  initializeApp({
    credential: credential.cert(serviceAccount),
  });
}

export async function POST(request: Request) {
  try {
    const { token } = await request.json();
    if (!token) {
      return NextResponse.json({ error: 'Authorization token is required' }, { status: 401 });
    }

    const decodedToken = await adminAuth().verifyIdToken(token);
    const { uid, email, name, picture } = decodedToken;
    
    // Here you can add your own logic to create or update the user in your database.
    // For now, we'll just log the user's information.
    console.log('User synced:', { uid, email, name, picture });

    return NextResponse.json({ success: true, user: { uid, email, name, picture } });
  } catch (error) {
    console.error('Error verifying token or syncing user:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
