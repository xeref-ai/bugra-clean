

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  model?: string;
  filePreview?: string | null;
  votes?: number;
}

export type TaskStatus = 'todo' | 'in_progress' | 'done' | 'archived';

// This is a simplified Task type for the client-side UI.
// The full type from the database might be different.
export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: 'Easy' | 'Medium' | 'Hard';
  completedAt?: any; // Can be a Date, string, or Firestore Timestamp
  dueDate?: any;
}


export interface Idea {
  id: string;
  text: string;
  createdAt: any;
}

export interface UserContext {
    context: string;
    goals?: string;
    skills?: string[];
}

export interface Note {
    id: string;
    user_id: string;
    title: string | null;
    content: string | null;
    created_at: string;
    updated_at: string;
}

    
