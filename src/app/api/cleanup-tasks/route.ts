
import { NextResponse } from 'next/server';
// import { db } from '@/lib/firestore';
// import { cleanupTask } from '@/ai/flows/cleanup-task';
// import { logger } from '@/lib/logger';

/**
 * An API endpoint to clean up and enrich tasks using an AI flow.
 * This endpoint fetches unprocessed tasks from Firestore, processes them in a batch,
 * and updates them with the cleaned-up data.
 *
 * @disabled Temporarily disabled to allow for deployment.
 */
export async function POST() {
  return NextResponse.json({ message: 'This feature is temporarily disabled.' }, { status: 503 });
  
  // const batchSize = 10; // Process 10 tasks at a time to avoid timeouts

  // try {
  //   const tasksSnapshot = await db.collection('tasks')
  //     .where('isCleaned', '==', false)
  //     .limit(batchSize)
  //     .get();

  //   if (tasksSnapshot.empty) {
  //     logger.info('No tasks to clean up.');
  //     return NextResponse.json({ message: 'No tasks to clean up.', status: 'PROCESSING_COMPLETE' });
  //   }

  //   const cleanupPromises = tasksSnapshot.docs.map(async (doc) => {
  //     const taskData = doc.data();
  //     const cleanedData = await cleanupTask(taskData.title);

  //     return doc.ref.update({
  //       ...cleanedData,
  //       isCleaned: true,
  //     });
  //   });

  //   await Promise.all(cleanupPromises);

  //   logger.info(`Successfully cleaned up ${tasksSnapshot.size} tasks.`);
  //   return NextResponse.json({ message: `Cleaned up ${tasksSnapshot.size} tasks.`, status: 'PROCESSING_COMPLETE' });

  // } catch (error) {
  //   logger.error('Error during task cleanup:', error);
  //   return NextResponse.json({ message: 'An error occurred during cleanup.', error: error.message }, { status: 500 });
  // }
}
