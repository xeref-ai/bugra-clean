
import * as functions from 'firebase-functions';
import admin from 'firebase-admin';
import { resummarizeSource } from './lib/actions'; // Assuming actions can be shared

// This function will run on a schedule
export const scheduledSummarizer = functions.pubsub
  .schedule('every 24 hours') // You can change this to a more frequent schedule e.g., 'every 1 hours'
  .timeZone('Etc/UTC')
  .onRun(async (context) => {
    console.log('Running scheduled summarizer job.');

    const db = admin.firestore();
    const sourcesRef = db.collection('sources');
    
    // Find sources that are 'pending' or haven't been summarized in the last 7 days
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
      console.log('No stale or pending sources to process.');
      return null;
    }

    console.log(`Found ${sourcesToProcess.length} sources to re-summarize.`);

    // Process each source with a delay to avoid overwhelming APIs
    for (const sourceId of sourcesToProcess) {
      try {
        console.log(`Processing source: ${sourceId}`);
        await resummarizeSource(sourceId);
      } catch (error) {
        console.error(`Failed to re-summarize source ${sourceId}:`, error);
        // Update status to 'failed' to prevent retrying on every run
        await db.collection('sources').doc(sourceId).update({ status: 'failed' });
      }
    }

    console.log('Scheduled summarizer job finished.');
    return null;
  });
