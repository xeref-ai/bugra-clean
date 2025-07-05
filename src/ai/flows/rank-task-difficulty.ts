'use server';

/**
 * @fileOverview Ranks the difficulty of a task.
 *
 * - rankTaskDifficulty - A function that ranks the difficulty of a task.
 * - RankTaskDifficultyInput - The input type for the rankTaskDifficulty function.
 * - RankTaskDifficultyOutput - The return type for the rankTaskDifficulty function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const RankTaskDifficultyInputSchema = z.object({
  taskDescription: z.string().describe('The description of the task.'),
});
export type RankTaskDifficultyInput = z.infer<typeof RankTaskDifficultyInputSchema>;

const RankTaskDifficultyOutputSchema = z.object({
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).describe('The difficulty level of the task.'),
});
export type RankTaskDifficultyOutput = z.infer<typeof RankTaskDifficultyOutputSchema>;

export async function rankTaskDifficulty(input: RankTaskDifficultyInput): Promise<RankTaskDifficultyOutput> {
  return rankTaskDifficultyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'rankTaskDifficultyPrompt',
  input: {
    schema: z.object({
      taskDescription: z.string().describe('The description of the task.'),
    }),
  },
  output: {
    schema: z.object({
      difficulty: z.enum(['Easy', 'Medium', 'Hard']).describe('The difficulty level of the task.'),
    }),
  },
  prompt: `You are an AI assistant that ranks the difficulty of tasks.
Given the following task description, rank its difficulty as either "Easy", "Medium", or "Hard".
Consider the complexity, effort, and time typically required to complete the task.

Task Description: {{{taskDescription}}}

Output the difficulty as a single word: "Easy", "Medium", or "Hard".`,
});

const rankTaskDifficultyFlow = ai.defineFlow<
  typeof RankTaskDifficultyInputSchema,
  typeof RankTaskDifficultyOutputSchema
>({
  name: 'rankTaskDifficultyFlow',
  inputSchema: RankTaskDifficultyInputSchema,
  outputSchema: RankTaskDifficultyOutputSchema,
},
async input => {
  const {output} = await prompt(input);
  return output!;
});
