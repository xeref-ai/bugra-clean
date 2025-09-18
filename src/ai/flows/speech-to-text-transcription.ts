'use server';
/**
 * @fileOverview Converts speech to text using an AI model.
 *
 * - speechToTextTranscription - A function that transcribes audio data to text.
 * - SpeechToTextTranscriptionInput - The input type for the speechToTextTranscription function.
 * - SpeechToTextTranscriptionOutput - The return type for the speechToTextTranscription function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SpeechToTextTranscriptionInputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      "A data URI of the audio to be transcribed. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SpeechToTextTranscriptionInput = z.infer<typeof SpeechToTextTranscriptionInputSchema>;

const SpeechToTextTranscriptionOutputSchema = z.object({
  transcription: z.string().describe('The transcribed text from the audio data.'),
});
export type SpeechToTextTranscriptionOutput = z.infer<typeof SpeechToTextTranscriptionOutputSchema>;

export async function speechToTextTranscription(input: SpeechToTextTranscriptionInput): Promise<SpeechToTextTranscriptionOutput> {
  return speechToTextTranscriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'speechToTextTranscriptionPrompt',
  model: 'gemini-1.5-flash-latest', // Specify a model that supports audio
  input: {
    schema: SpeechToTextTranscriptionInputSchema,
  },
  output: {
    schema: SpeechToTextTranscriptionOutputSchema,
  },
  prompt: `Please transcribe the following audio. {{media url=audioDataUri}}`,
});

const speechToTextTranscriptionFlow = ai.defineFlow(
  {
    name: 'speechToTextTranscriptionFlow',
    inputSchema: SpeechToTextTranscriptionInputSchema,
    outputSchema: SpeechToTextTranscriptionOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('No transcription was generated.');
    }
    return output;
  }
);
