
import { NextResponse } from 'next/server';
import { db } from '@/lib/firestore';
import { logger } from '@/lib/logger';
import { collection, writeBatch, doc } from 'firebase/firestore';

/**
 * Parses the HTML content from a Telegram chat export.
 * Note: This is a basic parser and might need to be adjusted based on the specific
 * structure of your exported HTML file.
 * @param htmlContent The HTML content as a string.
 * @returns An array of message objects.
 */
function parseTelegramHtml(htmlContent: string): { author: string; text: string; timestamp: string }[] {
    const messages = [];
    // This regex is a simplified example; a more robust DOM parser might be needed for complex cases.
    const messageRegex = /<div class="message default.+?">.*?<div class="from_name">([^<]+)<\/div>.*?<div class="text">([^<]+)<\/div>.*?<div class="date" title="([^"]+)">/gs;
    
    let match;
    while ((match = messageRegex.exec(htmlContent)) !== null) {
        let text = match[2].trim().replace(/<br\s*\/?>/gi, '\\n');
        // As requested, replace 'vectal' with 'xeref'
        text = text.replace(/vectal/gi, 'xeref');

        messages.push({
            author: match[1].trim(),
            text,
            timestamp: new Date(match[3]).toISOString(),
        });
    }
    return messages;
}

/**
 * API endpoint to import messages from a Telegram chat export into Firestore.
 */
export async function POST(req: Request) {
  logger.info('Received request to import Telegram chat history.');

  try {
    const body = await req.json();
    const { htmlContent, userId } = body;

    if (!htmlContent || !userId) {
      return NextResponse.json({ message: 'Bad Request: htmlContent and userId are required.' }, { status: 400 });
    }

    const messages = parseTelegramHtml(htmlContent);

    if (messages.length === 0) {
        return NextResponse.json({ message: 'No messages found to import.' }, { status: 200 });
    }
    
    const batch = writeBatch(db);
    const messagesCollection = collection(db, 'users', userId, 'telegram_chats');
    
    messages.forEach((msg) => {
        const docRef = doc(messagesCollection);
        batch.set(docRef, msg);
    });

    await batch.commit();

    logger.info(`Successfully imported ${messages.length} messages for user ${userId}.`);
    return NextResponse.json({ message: 'Import successful!', count: messages.length });

  } catch (error) {
    logger.error('Error importing Telegram chat:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
