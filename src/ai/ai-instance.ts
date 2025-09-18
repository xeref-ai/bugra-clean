
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Initialize Genkit with the Google AI plugin
// Genkit will automatically use the GOOGLE_GENAI_API_KEY from your .env file.
export const ai = genkit({
  plugins: [
    googleAI(),
  ],
});
