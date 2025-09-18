
import { genAI } from '@/lib/ai';

export async function enhancePrompt(prompt: string): Promise<string> {
  // const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  // const instruction = `
  //   You are a prompt engineering expert. Your task is to take a user's prompt and enhance it to be more detailed, context-aware, and effective for a large language model.

  //   Original prompt: "${prompt}"

  //   Enhanced prompt:
  // `;

  // const result = await model.generateContent(instruction);
  // const response = await result.response;
  // const enhancedPrompt = response.text();

  // return enhancedPrompt;
  return prompt; // Temporarily return the original prompt to allow deployment
}
