
import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function GET() {
  if (!adminDb) {
    return NextResponse.json({ status: 'error', error: 'Firebase Admin not initialized' }, { status: 500 });
  }

  try {
    // Check Firestore connection by getting a simple document
    await adminDb.collection('health_check').doc('status').get();
    
    return NextResponse.json({ status: 'ok', timestamp: new Date().toISOString() });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json({ status: 'error', error: 'Could not connect to Firebase' }, { status: 500 });
  }
}
