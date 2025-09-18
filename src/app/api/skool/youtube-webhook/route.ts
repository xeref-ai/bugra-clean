
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    // Log the entire payload to understand what Skool is sending
    console.log('--- SKOOL YOUTUBE WEBHOOK ---');
    console.log('Received Payload:', JSON.stringify(payload, null, 2));
    console.log('-----------------------------');

    // In the future, you could use this payload to trigger
    // other actions, like sending a notification or updating a database.

    // Respond with the YouTube video ID for the frontend to use
    return NextResponse.json({ 
        message: 'Webhook received successfully', 
        youtubeVideoId: 'YOUR_YOUTUBE_VIDEO_ID_HERE' // Replace with your actual video ID
    }, { status: 200 });

  } catch (error) {
    console.error('Error processing Skool webhook:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
