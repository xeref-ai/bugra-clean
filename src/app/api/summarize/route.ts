
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';
import * as cheerio from 'cheerio';
import { SUMMARIZE_SOURCES_PROMPT } from '@/ai/prompts/summarize-sources';
import { ApiError, FetchError, ContentExtractionError } from '@/lib/api-errors';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

async function fetchAndExtractContent(url: string) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10-second timeout

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new FetchError(url, response.status, response.statusText);
    }
    const html = await response.text();
    const doc = new JSDOM(html, { url });
    const reader = new Readability(doc.window.document);
    const article = reader.parse();

    if (article && article.textContent) {
      return {
        title: article.title,
        content: article.textContent,
        excerpt: article.excerpt,
        siteName: article.siteName,
      };
    } else {
      const $ = cheerio.load(html);
      const title = $('title').first().text() || $('h1').first().text();
      const textContent = $('body').text().replace(/\s\s+/g, ' ').trim();

      if (!textContent) {
        throw new ContentExtractionError(url);
      }
      
      return {
        title: title,
        content: textContent.substring(0, 5000),
        excerpt: textContent.substring(0, 200),
        siteName: new URL(url).hostname,
      };
    }
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof ApiError) {
      throw error;
    }
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError('The request timed out.', 408);
    }
    console.error(`Error processing URL ${url}:`, error);
    throw new ApiError(`Could not process the URL: ${url}.`, 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const extractedContent = await fetchAndExtractContent(url);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = SUMMARIZE_SOURCES_PROMPT
        .replace('{now}', new Date().toISOString())
        .replace('{project_name}', 'Xeref.ai')
        .replace('{user_message}', `Summarize the following content from ${url}`)
        .replace('{sources}', JSON.stringify([{ id: 'S1', url, title: extractedContent.title, site_name: extractedContent.siteName }]))
        .replace('{retrieved_chunks}', JSON.stringify([{ source_id: 'S1', chunk_id: 1, text: extractedContent.content }]));

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    return NextResponse.json({ summary, title: extractedContent.title });
  } catch (error) {
    console.error(error);
    if (error instanceof ApiError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
