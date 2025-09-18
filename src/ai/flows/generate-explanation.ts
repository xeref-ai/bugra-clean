// src/ai/flows/generate-explanation.ts
'use server';
/**
 * @fileOverview Generates an AI explanation for a given text input.
 *
 * - generateExplanation - A function that generates an AI explanation.
 * - GenerateExplanationInput - The input type for the generateExplanation function.
 * - GenerateExplanationOutput - The return type for the generateExplanation function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateExplanationInputSchema = z.object({
  text: z.string().describe('The text to be explained.'),
});
export type GenerateExplanationInput = z.infer<typeof GenerateExplanationInputSchema>;

const GenerateExplanationOutputSchema = z.object({
  explanation: z.string().describe('The AI-generated explanation.'),
});
export type GenerateExplanationOutput = z.infer<typeof GenerateExplanationOutputSchema>;

export const generateExplanation = ai.defineFlow(
  {
    name: 'generateExplanationFlow',
    inputSchema: GenerateExplanationInputSchema,
    outputSchema: GenerateExplanationOutputSchema,
  },
  async (input) => {
    const modelId = 'gemini-1.5-flash-latest';

    const prompt = `Explain the following text in a clear and concise way: ${input.text}`;

    const generateResult = await ai.generate({
      model: `googleai/${modelId}`,
      prompt: prompt,
    });

    const explanation = generateResult.text;

    if (!explanation) {
      throw new Error('AI failed to generate an explanation.');
    }

    return {explanation};
  },
);
