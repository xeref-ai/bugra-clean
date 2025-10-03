
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  deleteDoc,
  serverTimestamp,
  orderBy,
  writeBatch,
  setDoc,
  getDoc,
} from 'firebase/firestore';
import { db } from './firebase';
import { type Task, type Idea, type UserContext } from './types';

export { db };

// By removing the ensureNetwork function, we allow the Firestore SDK
// to manage the network state automatically. Combined with the
// IndexedDB persistence enabled in firebase.ts, this is the robust
// way to handle online/offline transitions.

// TASKS
export async function addTask(userId: string, task: Omit<Task, 'id' | 'createdAt' | 'isArchived'>) {
  if (!userId) throw new Error("User ID is required to add a task.");
  const tasksCollection = collection(db, 'users', userId, 'tasks');
  const docRef = await addDoc(tasksCollection, {
    ...task,
    createdAt: serverTimestamp(),
    isArchived: false,
  });
  return docRef.id;
}

export async function getTasksFromFirestore(userId: string): Promise<Task[]> {
  if (!userId) {
    console.error("User ID is required to fetch tasks.");
    return [];
  }
  const tasksCollection = collection(db, 'users', userId, 'tasks');
  const q = query(tasksCollection, where("isArchived", "==", false), orderBy('createdAt', 'desc'));
  
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Task));
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
}

// IDEAS
export async function addIdea(userId: string, idea: Omit<Idea, 'id' | 'createdAt'>) {
  if (!userId) throw new Error("User ID is required to add an idea.");
  const ideasCollection = collection(db, 'users', userId, 'ideas');
  await addDoc(ideasCollection, {
    ...idea,
    createdAt: serverTimestamp(),
  });
}

export async function getIdeasFromFirestore(userId: string): Promise<Idea[]> {
  if (!userId) {
    console.error("User ID is required to fetch ideas.");
    return [];
  }
  const ideasCollection = collection(db, 'users', userId, 'ideas');
  const q = query(ideasCollection, orderBy('createdAt', 'desc'));

  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Idea));
  } catch (error) {
    console.error("Error fetching ideas:", error);
    return [];
  }
}

// USER CONTEXT
export async function getUserContext(userId: string): Promise<UserContext | null> {
    if (!userId) {
        console.error("User ID is required to fetch user context.");
        return null;
    }
    const contextDocRef = doc(db, 'users', userId, 'context', 'main');
    try {
        const docSnap = await getDoc(contextDocRef);
        if (docSnap.exists()) {
            return docSnap.data() as UserContext;
        } else {
            return null; // No context set yet
        }
    } catch (error) {
        console.error("Error fetching user context:", error);
        return null;
    }
}

export async function updateUserContext(userId: string, context: UserContext) {
    if (!userId) throw new Error("User ID is required to update user context.");
    const contextDocRef = doc(db, 'users', userId, 'context', 'main');
    await setDoc(contextDocRef, context, { merge: true });
}
