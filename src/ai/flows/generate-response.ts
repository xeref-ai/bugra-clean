
'use server';

/**
 * @fileOverview Generates an AI response to a given message, optionally using web search or internal docs.
 *
 * - generateResponse - A function that generates an AI response.
 * - GenerateResponseInput - The input type for the generateResponse function.
 * - GenerateResponseOutput - The return type for the generateResponse function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

// Define a schema for a single message in the conversation history
const MessageSchema = z.object({
  role: z.enum(['user', 'assistant']).describe("The role of the message sender, either 'user' or 'assistant'."),
  content: z.string().describe("The content of the message."),
});

const GenerateResponseInputSchema = z.object({
  message: z.string().describe('The latest message from the user to respond to.'),
  history: z.array(MessageSchema).optional().describe('The history of the conversation so far, excluding the current message.'),
  agentName: z.string().describe('The name of the AI agent to use.'),
  useWebSearch: z.boolean().optional().describe('Whether to use web search to enhance the response.'),
  systemPrompt: z.string().optional().describe('An optional system prompt to guide the AI.'),
  temperature: z.number().optional().describe('The model temperature.'),
  fileDataUri: z.string().optional().describe("An optional file attached by the user, as a data URI. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type GenerateResponseInput = z.infer<typeof GenerateResponseInputSchema>;

const GenerateResponseOutputSchema = z.object({
  response: z.string().describe('The AI-generated response.'),
});
export type GenerateResponseOutput = z.infer<typeof GenerateResponseOutputSchema>;

export async function generateResponse(input: GenerateResponseInput): Promise<GenerateResponseOutput> {
  return generateResponseFlow(input);
}

// Define a tool for web search
const webSearch = ai.defineTool({
  name: 'perplexityWebSearch',
  description: 'Searches the web using Perplexity to provide up-to-date information.',
  inputSchema: z.object({
    query: z.string().describe('The search query.'),
  }),
  outputSchema: z.string(),
}, async (input) => {
  // This is a placeholder implementation - replace with actual API call
  console.log(`Performing web search with query: ${input.query}`);
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate a delay
  return `Web search results for "${input.query}": This is a simulated web search result.`;
});


const generateResponseFlow = ai.defineFlow(
  {
    name: 'generateResponseFlow',
    inputSchema: GenerateResponseInputSchema,
    outputSchema: GenerateResponseOutputSchema,
  },
  async (input: GenerateResponseInput) => {

    // Force the model to Gemini 1.5 Flash for stability.
    const modelId = 'googleai/gemini-1.5-flash-latest';

    // Map the history from our app's format to Genkit's format
    const history = (input.history || []).map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{text: msg.content}],
    }));
    
    let availableTools = [];
    if (input.useWebSearch) {
      availableTools.push(webSearch);
    }

    const defaultSystemPrompt = `You are ${input.agentName}, a world-class startup advisor and AI assistant for Xeref.ai.
Your personality is helpful, insightful, and slightly informal. Your primary role is to provide actionable advice for startups and answer questions about the project.
${input.useWebSearch ? 'You can also use the `perplexityWebSearch` tool for recent information or topics not covered in the docs.' : 'Do not use web search unless explicitly asked.'}
Always provide your response in clean markdown format.`;
    
    const systemPrompt = input.systemPrompt || defaultSystemPrompt;

    const promptParts = [];
    if (input.fileDataUri) {
      promptParts.push({ media: { url: input.fileDataUri } });
    }
    if (input.message) {
      promptParts.push({ text: input.message });
    }

    const generateResult = await ai.generate({
        model: modelId,
        prompt: promptParts,
        config: {
          temperature: input.temperature,
        }
    });
    
    const responseText = generateResult.text;

    if (!responseText) {
      throw new Error("AI failed to generate a response. The output was empty.");
    }
    
    return { response: responseText };
  }
);
