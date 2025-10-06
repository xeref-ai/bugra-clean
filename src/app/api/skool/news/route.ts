
import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export async function GET() {
  if (!db) {
    return NextResponse.json({ error: 'Firebase Admin not initialized' }, { status: 500 });
  }
  try {
    const newsSnapshot = await db.collection('skool_news').orderBy('createdAt', 'desc').limit(5).get();
    const news = newsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    return NextResponse.json(news);
  } catch (error) {
    console.error('Error fetching Skool news:', error);
    // The "client is offline" error often originates here if the admin SDK is not authenticated.
    return new NextResponse('Internal Server Error: ' + (error as Error).message, { status: 500 });
  }
}
