
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
import fs from 'fs/promises';
import path from 'path';

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

// Define a tool for searching the internal project documents
const searchProjectDocs = ai.defineTool(
    {
      name: 'searchProjectDocs',
      description: 'Searches internal project documents, including READMEs, notes, and playbooks for information about the project, features, or people like Bugra Karsli.',
      inputSchema: z.object({
        query: z.string().describe('The search query. Can be a keyword, name, or phrase.'),
      }),
      outputSchema: z.string().describe('The relevant content found in the documents. Returns a summary if no specific content is found or if an error occurs.'),
    },
    async ({ query }) => {
      const filesToSearch = [
          'README.md',
          'notes.md',
          'docs/startup_playbook.md',
          'tasks.md',
          'docs/google_search_settings.md',
          'docs/AGENTS.md',
      ];
      
      let searchResults = '';
      const queryLower = query.toLowerCase();
  
      try {
        for (const file of filesToSearch) {
          const docPath = path.resolve(process.cwd(), file);
          try {
              const content = await fs.readFile(docPath, 'utf-8');
              if (content.toLowerCase().includes(queryLower)) {
                  searchResults += `--- Found in ${file} ---\n${content}\n\n`;
              }
          } catch (readError: any) {
              if (readError.code !== 'ENOENT') { // ENOENT is file not found, which is fine
                  console.warn(`Error reading file ${file}:`, readError);
              }
          }
        }
  
        if (searchResults) {
          return `Here is the information found for "${query}":\n\n${searchResults}`;
        } else {
          return `No information found for "${query}" in the project documents.`;
        }
      } catch (error) {
        console.error('Error searching project documents:', error);
        return 'There was an error while searching the project documents.';
      }
    }
);


const generateResponseFlow = ai.defineFlow(
  {
    name: 'generateResponseFlow',
    inputSchema: GenerateResponseInputSchema,
    outputSchema: GenerateResponseOutputSchema,
  },
  async (input: GenerateResponseInput) => {
    // Map friendly names from the UI to actual Genkit model IDs
    const modelMap: { [key: string]: string } = {
      'gemini 2.5 pro': 'googleai/gemini-1.5-pro',
      'gemini 2.5 flash': 'googleai/gemini-1.5-flash',
    };

    // Determine the model to use, with a fallback to Flash
    const selectedModelKey = input.agentName?.toLowerCase();
    const modelId = (selectedModelKey && modelMap[selectedModelKey])
      ? modelMap[selectedModelKey]
      : 'googleai/gemini-1.5-flash'; // Fallback for non-Google models like GPT, Claude, etc.

    // Map the history from our app's format to Genkit's format
    const history = (input.history || []).map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{text: msg.content}],
    }));
    
    let availableTools = [searchProjectDocs];
    if (input.useWebSearch) {
      availableTools.push(webSearch);
    }

    const defaultSystemPrompt = `You are ${input.agentName}, a world-class startup advisor and AI assistant for Xeref.ai.
Your personality is helpful, insightful, and slightly informal. Your primary role is to provide actionable advice for startups and answer questions about the project using internal documentation.
When asked about startup strategy, growth, MVPs, project features, or people like Bugra Karsli, you MUST use the \`searchProjectDocs\` tool to get information. The tool contains the most up-to-date context about the project.
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
        history: history,
        tools: availableTools,
        system: systemPrompt,
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
