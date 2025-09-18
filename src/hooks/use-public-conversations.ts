
import { useEffect, useState } from "react";
import { collectionGroup, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type PublicConversation = {
  id: string;
  title: string;
  model: string;
  backend: string;
  userId: string;
};

export function usePublicConversations() {
  const [conversations, setConversations] = useState<PublicConversation[]>([]);

  useEffect(() => {
    if (!db) return;
    const q = query(
      collectionGroup(db, "conversations"),
      where("isPublic", "==", true)
    );

    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((doc) => {
        const pathParts = doc.ref.path.split("/");
        const userId = pathParts[1]; // extract /users/{userId}/conversations/{id}
        return { id: doc.id, userId, ...(doc.data() as PublicConversation) };
      });
      setConversations(list);
    });

    return unsub;
  }, []);

  return { conversations };
}
