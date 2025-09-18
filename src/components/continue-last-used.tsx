
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';

export function ContinueLastUsed() {
  const { user } = useAuth();
  const [lastAccessed, setLastAccessed] = React.useState<{ title: string; href: string } | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (user) {
      const fetchLastAccessed = async () => {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          if (data.lastAccessed) {
            setLastAccessed(data.lastAccessed);
          }
        }
        setIsLoading(false);
      };
      fetchLastAccessed();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading || !lastAccessed) {
    return null; // Don't show anything if loading or no last accessed data
  }

  return (
    <Card className="mb-8 bg-secondary border-secondary-foreground/20">
      <CardHeader>
        <CardTitle>Welcome Back!</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground">Continue where you left off:</p>
            <p className="text-lg font-semibold">{lastAccessed.title}</p>
          </div>
          <Link href={lastAccessed.href}>
            <Button>
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
