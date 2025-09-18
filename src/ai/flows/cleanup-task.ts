
import { ai } from '@/ai/ai-instance';
import { z } from 'zod';

// This Zod schema defines the structure of a cleaned-up task.
// The AI will be instructed to return data in this format.
const cleanupSchema = z.object({
  cleanedTitle: z.string().describe("A concise and clear title for the task."),
  category: z.string().describe("A relevant category for the task (e.g., 'Development', 'Marketing', 'Personal')."),
  priority: z.enum(['Low', 'Medium', 'High']).describe("The priority of the task."),
  isActionable: z.boolean().describe("Whether the task is a clear, actionable item."),
});

/**
 * Takes a raw task string and returns a structured, cleaned-up version.
 * @param rawTask The user-provided task text.
 * @returns A structured task object with a cleaned title, category, priority, and actionable status.
 */
export async function cleanupTask(rawTask: string) {
  const result = await ai.generate({
    prompt: `Clean up and categorize the following task: "${rawTask}". Analyze the task and provide a concise title, a suitable category, a priority level, and determine if it's an actionable item.`,
    output: { schema: cleanupSchema },
  });

  return result;
}
