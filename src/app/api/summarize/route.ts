
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';
import * as cheerio from 'cheerio';
import * as Sentry from '@sentry/nextjs';
import { SUMMARIZE_SOURCES_PROMPT } from '@/ai/prompts/summarize-sources';
import { ApiError, FetchError, ContentExtractionError } from '@/lib/api-errors';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

async function fetchAndExtractContent(url: string) {
  return Sentry.startSpan({ name: 'fetch-and-extract-content', op: 'function' }, async (span) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10-second timeout

    try {
      const response = await Sentry.startSpan({ name: 'fetch-url', op: 'http.client' }, async () => {
        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (!res.ok) {
          throw new FetchError(url, res.status, res.statusText);
        }
        return res;
      });
      
      const html = await response.text();
      const article = await Sentry.startSpan({ name: 'parse-content', op: 'function' }, () => {
        const doc = new JSDOM(html, { url });
        const reader = new Readability(doc.window.document);
        return reader.parse();
      });

      if (article && article.textContent) {
        return {
          title: article.title,
          content: article.textContent,
          excerpt: article.excerpt,
          siteName: article.siteName,
        };
      } else {
        return Sentry.startSpan({ name: 'fallback-cheerio', op: 'function' }, () => {
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
        });
      }
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof ApiError) throw error;
      if (error instanceof Error && error.name === 'AbortError') throw new ApiError('The request timed out.', 408);
      
      Sentry.captureException(error);
      throw new ApiError(`Could not process the URL: ${url}.`, 500);
    }
  });
}

export async function POST(req: NextRequest) {
    return Sentry.startSpan({ name: 'summarize-api-route', op: 'http.server' }, async (span) => {
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

            const summary = await Sentry.startSpan({ name: 'generate-summary-ai', op: 'ai.run' }, async () => {
                const result = await model.generateContent(prompt);
                const response = await result.response;
                return response.text();
            });

            return NextResponse.json({ summary, title: extractedContent.title });
        } catch (error) {
            Sentry.captureException(error);
            if (error instanceof ApiError) {
            return NextResponse.json({ error: error.message }, { status: error.statusCode });
            }
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    });
}
