
import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { db } from '@/lib/firestore';
import { collection, addDoc } from 'firebase/firestore';

// The shape of the data sent by Cloud Billing's Pub/Sub messages
interface BillingData {
  budgetDisplayName: string;
  costAmount: number;
  costIntervalStart: string;
  currencyCode: string;
}

// The overall structure of the Pub/Sub message
interface PubSubMessage {
  message: {
    data: string; // This is a base64 encoded string
    messageId: string;
    publishTime: string;
  };
  subscription: string;
}

/**
 * Handles incoming Pub/Sub messages from Google Cloud Billing.
 * This endpoint is designed to be the target of a Pub/Sub push subscription.
 *
 * @param {Request} req The incoming request object.
 * @returns {NextResponse} A response object.
 */
export async function POST(req: Request) {
  logger.info('Received billing webhook request');

  try {
    const body: PubSubMessage = await req.json();

    if (!body.message || !body.message.data) {
      logger.error('Invalid Pub/Sub message received: missing message or data');
      return NextResponse.json({ message: 'Bad Request: Invalid Pub/Sub message' }, { status: 400 });
    }

    // Decode the base64-encoded data from the Pub/Sub message
    const dataString = Buffer.from(body.message.data, 'base64').toString('utf8');
    const billingData: BillingData = JSON.parse(dataString);

    // Add a timestamp and save the billing data to Firestore
    const docData = {
      ...billingData,
      createdAt: new Date().toISOString(),
      messageId: body.message.messageId,
    };

    // Add the document to a 'billing' collection in Firestore using the modular syntax
    const billingCollection = collection(db, 'billing');
    await addDoc(billingCollection, docData);

    logger.info(`Successfully stored billing data for budget: ${billingData.budgetDisplayName}`);

    // Acknowledge the message with a 200 OK to prevent Pub/Sub from redelivering
    return NextResponse.json({ message: 'Success' }, { status: 200 });

  } catch (error) {
    logger.error('Error processing billing webhook:', error);
    // Don't send a 200 OK if there was an error, so Pub/Sub can retry
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
