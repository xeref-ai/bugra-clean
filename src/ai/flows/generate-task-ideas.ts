
'use server';

/**
 * @fileOverview Generates three task ideas based on the last user message.
 *
 * - generateTaskIdeas - A function that generates and ranks task ideas.
 * - GenerateTaskIdeasInput - The input type for the function.
 * - GenerateTaskIdeasOutput - The return type for the function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateTaskIdeasInputSchema = z.object({
  message: z.string().describe('The user message to base the ideas on.'),
});
export type GenerateTaskIdeasInput = z.infer<typeof GenerateTaskIdeasInputSchema>;

const TaskIdeaSchema = z.object({
    description: z.string().describe('The description of the task idea.'),
    difficulty: z.enum(['Easy', 'Medium', 'Hard']).describe('The estimated difficulty of the task.'),
});

const GenerateTaskIdeasOutputSchema = z.object({
  ideas: z.array(TaskIdeaSchema).describe('An array of task ideas.'),
});
export type GenerateTaskIdeasOutput = z.infer<typeof GenerateTaskIdeasOutputSchema>;


export async function generateTaskIdeas(input: GenerateTaskIdeasInput): Promise<GenerateTaskIdeasOutput> {
  return generateTaskIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTaskIdeasPrompt',
  input: {
    schema: GenerateTaskIdeasInputSchema,
  },
  output: {
    schema: GenerateTaskIdeasOutputSchema,
  },
  prompt: `You are an expert project manager and startup advisor. Your goal is to help users break down their thoughts into actionable steps.
Based on the following user message, generate exactly three actionable and relevant task ideas.
For each task, provide a concise description and rank its difficulty as "Easy", "Medium", or "Hard". The tasks should be distinct, creative, and where possible, follow the SMART goal framework (Specific, Measurable, Achievable, Relevant, Time-bound).

User Message: {{{message}}}

Provide the output in the specified JSON format. The list of ideas must be sorted by difficulty, with "Easy" tasks first.`,
});

const generateTaskIdeasFlow = ai.defineFlow(
  {
    name: 'generateTaskIdeasFlow',
    inputSchema: GenerateTaskIdeasInputSchema,
    outputSchema: GenerateTaskIdeasOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(
      input,
      { model: 'googleai/gemini-2.5-flash-latest' }
    );
    if (!output) {
        throw new Error('AI failed to generate task ideas.');
    }
    // Sort ideas by difficulty: Easy, Medium, Hard
    const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
    output.ideas.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
    
    return output;
  }
);
