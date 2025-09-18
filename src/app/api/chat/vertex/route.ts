
import { NextResponse } from 'next/server';
import { VertexAI } from '@google-cloud/vertexai';

const vertex_ai = new VertexAI({
  project: process.env.GOOGLE_CLOUD_PROJECT_ID!,
  location: process.env.GOOGLE_CLOUD_LOCATION!,
});

const model = 'gemini-1.5-flash-001';

const generativeModel = vertex_ai.getGenerativeModel({
  model: model,
  generationConfig: {
    maxOutputTokens: 8192,
    temperature: 1,
    topP: 0.95,
  },
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return new NextResponse('Prompt is required', { status: 400 });
    }

    const chat = generativeModel.startChat({});
    const streamResult = await chat.sendMessageStream(prompt);
    
    // For this initial implementation, we will consume the stream and return the full response.
    // In a future update, we can stream the response to the client.
    let responseText = '';
    for await (const item of streamResult.stream) {
        if (item.candidates && item.candidates[0].content && item.candidates[0].content.parts) {
            responseText += item.candidates[0].content.parts.map(part => part.text).join('');
        }
    }
    
    return NextResponse.json({ response: responseText });

  } catch (error) {
    console.error('Error with Vertex AI:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
