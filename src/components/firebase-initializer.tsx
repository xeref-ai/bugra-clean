
'use client';

import { useEffect } from 'react';
import { initializeClientServices } from '@/lib/firebase';

export const FirebaseInitializer = () => {
  useEffect(() => {
    // This runs only once on the client when the app mounts
    initializeClientServices();
  }, []);

  return null; // This component does not render anything
};
