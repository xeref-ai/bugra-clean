
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
} from 'firebase/firestore';
import { db } from './firebase';
import { type Task, type Idea } from './types';

// TASKS

export async function addTaskToFirestore(userId: string, taskData: Omit<Task, 'id' | 'completed' | 'createdAt' | 'completedAt'>): Promise<string> {
  if (!db) throw new Error("Firestore is not initialized");
  const tasksCol = collection(db, 'users', userId, 'tasks');
  const docRef = await addDoc(tasksCol, {
    ...taskData,
    completed: false,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getTasksFromFirestore(userId: string): Promise<Task[]> {
  if (!db) return [];
  const tasksCol = collection(db, 'users', userId, 'tasks');
  const q = query(tasksCol, orderBy('createdAt', 'desc'));
  const tasksSnapshot = await getDocs(q);
  return tasksSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Task[];
}

export async function updateTaskInFirestore(userId: string, taskId: string, updates: Partial<Task>): Promise<void> {
  if (!db) throw new Error("Firestore is not initialized");
  const taskDoc = doc(db, 'users', userId, 'tasks', taskId);
  await updateDoc(taskDoc, updates);
}

export async function archiveTaskInFirestore(userId: string, taskId: string): Promise<void> {
  if (!db) throw new Error("Firestore is not initialized");
  const taskDocRef = doc(db, 'users', userId, 'tasks', taskId);
  await updateDoc(taskDocRef, {
    completed: true,
    completedAt: serverTimestamp(),
  });
}

export async function deleteArchivedTasksFromFirestore(userId: string, taskIds: string[]): Promise<void> {
  if (!db) throw new Error("Firestore is not initialized");
  const batch = writeBatch(db);
  taskIds.forEach(taskId => {
    const taskDocRef = doc(db, 'users', userId, 'tasks', taskId);
    batch.delete(taskDocRef);
  });
  await batch.commit();
}

// IDEAS

export async function addIdeaToFirestore(userId: string, ideaData: { text: string }): Promise<string> {
  if (!db) throw new Error("Firestore is not initialized");
  const ideasCol = collection(db, 'users', userId, 'ideas');
  const docRef = await addDoc(ideasCol, {
    ...ideaData,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getIdeasFromFirestore(userId:string): Promise<Idea[]> {
    if (!db) return [];
    const ideasCol = collection(db, 'users', userId, 'ideas');
    const q = query(ideasCol, orderBy('createdAt', 'desc'));
    const ideasSnapshot = await getDocs(q);
    return ideasSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    })) as Idea[];
}

export async function deleteIdeaFromFirestore(userId: string, ideaId: string): Promise<void> {
  if (!db) throw new Error("Firestore is not initialized");
  const ideaDoc = doc(db, 'users', userId, 'ideas', ideaId);
  await deleteDoc(ideaDoc);
}
