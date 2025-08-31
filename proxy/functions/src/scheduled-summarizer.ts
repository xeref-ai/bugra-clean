
import * as functions from 'firebase-functions';
import admin from 'firebase-admin';
import { resummarizeSource } from './lib/actions'; // This will need to be adjusted for the functions environment
import { logger } from 'firebase-functions/v1';
import { randomUUID } from 'crypto';

const MONITOR_SLUG = 'xerenity-society';
const SENTRY_ORG = 'xerenity-society'; 
const SENTRY_AUTH_TOKEN = functions.config().sentry.auth_token;

async function sendSentryCheckIn(checkInId: string, status: 'in_progress' | 'ok' | 'error') {
  const url = `https://sentry.io/api/0/organizations/${SENTRY_ORG}/monitors/${MONITOR_SLUG}/checkins/`;
  const method = status === 'in_progress' ? 'POST' : 'PUT';
  const body = status === 'in_progress' 
    ? { check_in_id: checkInId, status: 'in_progress' }
    : { status: status };

  const finalUrl = status === 'in_progress' ? url : `${url}${checkInId}/`;

  try {
    await fetch(finalUrl, {
      method,
      headers: {
        'Authorization': `Sentry ${SENTRY_AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    logger.error('Failed to send Sentry check-in:', error);
  }
}


// This function will run on a schedule
export const scheduledSummarizer = functions.pubsub
  .schedule('every 24 hours')
  .timeZone('Etc/UTC')
  .onRun(async (context) => {
    logger.info('Running scheduled summarizer job.');
    const checkInId = randomUUID();
    await sendSentryCheckIn(checkInId, 'in_progress');
    let status: 'ok' | 'error' = 'ok';

    try {
        const db = admin.firestore();
        const sourcesRef = db.collection('sources');
        
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const staleDate = sevenDaysAgo.toISOString();

        const pendingQuery = sourcesRef.where('status', '==', 'pending').get();
        const staleQuery = sourcesRef.where('lastSummarizedAt', '<', staleDate).get();

        const [pendingSnapshot, staleSnapshot] = await Promise.all([pendingQuery, staleQuery]);

        const sourcesToProcess: string[] = [];
        pendingSnapshot.forEach(doc => sourcesToProcess.push(doc.id));
        staleSnapshot.forEach(doc => {
          if (!sourcesToProcess.includes(doc.id)) {
            sourcesToProcess.push(doc.id);
          }
        });

        if (sourcesToProcess.length === 0) {
          logger.info('No stale or pending sources to process.');
        } else {
            logger.info(`Found ${sourcesToProcess.length} sources to re-summarize.`);
            for (const sourceId of sourcesToProcess) {
              try {
                logger.info(`Processing source: ${sourceId}`);
                await resummarizeSource(sourceId);
              } catch (error) {
                logger.error(`Failed to re-summarize source ${sourceId}:`, error);
                await db.collection('sources').doc(sourceId).update({ status: 'failed' });
              }
            }
        }
        logger.info('Scheduled summarizer job finished.');
    } catch (error) {
        logger.error('Scheduled summarizer job failed:', error);
        status = 'error';
    } finally {
        await sendSentryCheckIn(checkInId, status);
    }

    return null;
  });
