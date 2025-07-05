
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, isFirebaseEnabled } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, isLoading: true });

// A flag to ensure the profile sync only happens once per session
let profileSyncAttempted = false;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const publicPaths = ['/login', '/privacy', '/terms', '/hiring', '/changelog'];

    if (!isFirebaseEnabled || !auth) {
        setIsLoading(false);
        if (!publicPaths.includes(pathname)) {
            router.push('/login');
        }
        return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser && !profileSyncAttempted) {
          profileSyncAttempted = true; // Set flag to prevent re-runs
          try {
              const token = await currentUser.getIdToken();
              // This endpoint creates a user profile in Firestore if it doesn't exist.
              await fetch('/api/users', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ token }),
              });
          } catch (error) {
              console.error("Failed to sync user profile:", error);
              // We don't want to block the user if this fails, but we log the error.
          }
      }

      setIsLoading(false);

      // If the user is not logged in and not on a public page, redirect to login
      if (!currentUser && !publicPaths.includes(pathname)) {
        router.push('/login');
      } 
      // If the user is logged in and on the login page, redirect to the app
      else if (currentUser && pathname === '/login') {
        router.push('/');
      }
    });

    return () => {
        unsubscribe();
        profileSyncAttempted = false; // Reset on component unmount
    }
  }, [pathname, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
