
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { content } = await req.json();

  if (!content) {
    return NextResponse.json({ error: 'Content is required' }, { status: 400 });
  }

  const skoolApiKey = process.env.SKOOL_API_KEY;
  const skoolCommunityId = process.env.SKOOL_COMMUNITY_ID;

  if (!skoolApiKey || !skoolCommunityId) {
    console.error('Skool API key or Community ID is not set');
    return NextResponse.json({ error: 'Skool integration is not configured' }, { status: 500 });
  }

  try {
    // NOTE: This is a hypothetical API endpoint. The actual endpoint may differ.
    // Please replace with the correct endpoint from Skool's API documentation.
    const response = await fetch('https://www.skool.com/api/v1/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${skoolApiKey}`,
      },
      body: JSON.stringify({
        community_id: skoolCommunityId,
        text: content,
        // The user handle/mention functionality would likely be handled here,
        // based on Skool's API capabilities. For now, we'll post as the app.
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Skool API Error:', errorData);
      return NextResponse.json({ error: 'Failed to post to Skool', details: errorData }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data });

  } catch (error) {
    console.error('Error posting to Skool:', error);
    return NextResponse.json({ error: 'An internal error occurred' }, { status: 500 });
  }
}
