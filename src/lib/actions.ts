
'use server';

import admin from 'firebase-admin';
import { firestore } from '@/lib/firebase-admin';
import { revalidatePath } from 'next/cache';

// --- Project Actions ---

export async function getProjects() {
  try {
    const projectsSnapshot = await firestore.collection('projects').get();
    const projects = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function addProject(projectName: string) {
  try {
    await firestore.collection('projects').add({ name: projectName, createdAt: new Date().toISOString() });
    revalidatePath('/bugrakarsli/projects');
  } catch (error) {
    console.error('Error adding project:', error);
    throw new Error('Failed to add project.');
  }
}

export async function updateProject(projectId: string, newName: string) {
    if (!projectId || !newName) {
        throw new Error('Project ID and new name are required.');
    }
    try {
        await firestore.collection('projects').doc(projectId).update({ name: newName });
        revalidatePath('/bugrakarsli/projects');
    } catch (error) {
        console.error('Error updating project:', error);
        throw new Error('Failed to update project.');
    }
}

export async function deleteProject(projectId: string) {
    if (!projectId) {
        throw new Error('Project ID is required.');
    }
    try {
        await firestore.collection('projects').doc(projectId).delete();
        revalidatePath('/bugrakarsli/projects');
    } catch (error) {
        console.error('Error deleting project:', error);
        throw new Error('Failed to delete project.');
    }
}

// --- Source Actions ---

export async function getSources(options: { status?: string; limit?: number; startAfter?: string }) {
  try {
    let query: admin.firestore.Query = firestore.collection('sources');

    if (options.status) {
      query = query.where('status', '==', options.status);
    }
    
    query = query.orderBy('createdAt', 'desc');

    if (options.startAfter) {
      const startAfterDoc = await firestore.collection('sources').doc(options.startAfter).get();
      query = query.startAfter(startAfterDoc);
    }

    if (options.limit) {
      query = query.limit(options.limit);
    }

    const sourcesSnapshot = await query.get();
    const sources = sourcesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return sources;
  } catch (error) {
    console.error('Error fetching sources:', error);
    return [];
  }
}

export async function addSource(url: string) {
  if (!url) {
    throw new Error('URL is required.');
  }
  try {
    await firestore.collection('sources').add({ 
      url: url,
      createdAt: new Date().toISOString(),
      status: 'pending',
    });
    revalidatePath('/bugrakarsli/sources');
  } catch (error) {
    console.error('Error adding source:', error);
    throw new Error('Failed to add source.');
  }
}

export async function updateSource(sourceId: string, data: { url?: string; title?: string; }) {
  if (!sourceId) {
    throw new Error('Source ID is required.');
  }
  try {
    await firestore.collection('sources').doc(sourceId).update(data);
    revalidatePath('/bugrakarsli/sources');
  } catch (error) {
    console.error('Error updating source:', error);
    throw new Error('Failed to update source.');
  }
}

export async function resummarizeSource(sourceId: string) {
  if (!sourceId) {
    throw new Error('Source ID is required.');
  }
  try {
    const sourceDoc = await firestore.collection('sources').doc(sourceId).get();
    const sourceData = sourceDoc.data();
    if (!sourceData || !sourceData.url) {
      throw new Error('Source not found or URL is missing.');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/summarize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: sourceData.url }),
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to re-summarize.');
    }

    const { summary, title } = await response.json();

    await firestore.collection('sources').doc(sourceId).update({
      summary,
      title,
      status: 'summarized',
      lastSummarizedAt: new Date().toISOString(),
    });

    revalidatePath('/bugrakarsli/sources');
    return { summary, title };
  } catch (error) {
    console.error('Error re-summarizing source:', error);
    throw new Error((error as Error).message);
  }
}


export async function deleteSource(sourceId: string) {
  if (!sourceId) {
    throw new Error('Source ID is required.');
  }
  try {
    await firestore.collection('sources').doc(sourceId).delete();
    revalidatePath('/bugrakarsli/sources');
  } catch (error) {
    console.error('Error deleting source:', error);
    throw new Error('Failed to delete source.');
  }
}

// --- Activity Actions ---

export async function getActivityLogs(options: {
  limit?: number;
  projectId?: string;
  userId?: string;
  startDate?: string;
  endDate?: string;
  startAfter?: string;
}) {
  try {
    let query: admin.firestore.Query = firestore.collection('activity');
    
    if (options.projectId) {
      query = query.where('projectId', '==', options.projectId);
    }
    if (options.userId) {
      query = query.where('userId', '==', options.userId);
    }
    if (options.startDate) {
      query = query.where('timestamp', '>=', options.startDate);
    }
    if (options.endDate) {
      query = query.where('timestamp', '<=', options.endDate);
    }

    query = query.orderBy('timestamp', 'desc');
    
    if (options.startAfter) {
      const startAfterDoc = await firestore.collection('activity').doc(options.startAfter).get();
      query = query.startAfter(startAfterDoc);
    }

    if (options.limit) {
      query = query.limit(options.limit);
    }

    const activitySnapshot = await query.get();
    const activity = activitySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return activity;

  } catch (error) {
    console.error('Error fetching activity logs:', error);
    return [];
  }
}

export async function getActivityLogCount(options: { lastDays?: number } = {}) {
    try {
        let query: admin.firestore.Query = firestore.collection('activity');
        if (options.lastDays) {
            const d = new Date();
            d.setDate(d.getDate() - options.lastDays);
            query = query.where('timestamp', '>=', d.toISOString());
        }
        const snapshot = await query.count().get();
        return snapshot.data().count;
    } catch (error) {
        console.error('Error fetching activity log count:', error);
        return 0;
    }
}
