
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Extract the YouTube URL from the Skool post content
    const content = body.post.content;
    const youtubeUrl = content.match(/https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/.+/)?.[0];

    if (youtubeUrl) {
      console.log('YouTube URL found:', youtubeUrl);
      // Here you would typically trigger a background job to process the video
      // For now, we'll just log it to the console
    }

    return NextResponse.json({ message: 'Webhook received' }, { status: 200 });
  } catch (error) {
    console.error('Error processing Skool webhook:', error);
    return NextResponse.json({ message: 'Error processing webhook' }, { status: 500 });
  }
}
