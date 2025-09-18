
import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return new NextResponse('Prompt is required', { status: 400 });
    }

    // This is a simplified example. In a real-world scenario, you would need to
    // handle authentication and ensure the Gemini CLI is installed and configured.
    const { stdout, stderr } = await execAsync(`gemini-cli "${prompt}"`);

    if (stderr) {
      throw new Error(stderr);
    }
    
    return NextResponse.json({ response: stdout });

  } catch (error) {
    console.error('Error with Gemini CLI:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
