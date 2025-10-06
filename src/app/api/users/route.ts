
// src/app/api/users/route.ts
import { NextResponse } from 'next/server';
import { auth as adminAuth } from 'firebase-admin';
// All other manual initialization is removed. We rely on the standardized one.
import { db } from '@/lib/firebase-admin';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();
    if (!token) {
      return NextResponse.json({ error: 'Authorization token is required' }, { status: 401 });
    }
    // The Admin SDK will be automatically initialized by this point.
    const decodedToken = await adminAuth().verifyIdToken(token);
    const { uid, email } = decodedToken;

    // Your logic to handle the user data...
    // Example: await db.collection('users').doc(uid).set({ email }, { merge: true });

    return NextResponse.json({ message: 'User authenticated successfully', uid });

  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }
}
