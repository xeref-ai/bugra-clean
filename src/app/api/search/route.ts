
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 });
  }

  const perplexityApiKey = process.env.PERPLEXITY_API_KEY;

  if (!perplexityApiKey) {
    console.error('PERPLEXITY_API_KEY is not set');
    return NextResponse.json({ error: 'API key is not configured' }, { status: 500 });
  }

  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${perplexityApiKey}`,
      },
      body: JSON.stringify({
        model: 'pplx-7b-online',
        messages: [
          { role: 'system', content: 'Be precise and concise.' },
          { role: 'user', content: query },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Perplexity API Error:', errorData);
      return NextResponse.json({ error: 'Failed to fetch from Perplexity API', details: errorData }, { status: response.status });
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || 'No response from Perplexity.';
    
    return NextResponse.json({ response: content });

  } catch (error) {
    console.error('Error calling Perplexity API:', error);
    return NextResponse.json({ error: 'An internal error occurred' }, { status: 500 });
  }
}
