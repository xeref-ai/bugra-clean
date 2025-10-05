
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin'; // Use the standardized admin db

// ... (rest of the file remains the same, but customInitApp is no longer needed or called)

export async function POST(req: NextRequest) {
    // ... function logic ...
}
