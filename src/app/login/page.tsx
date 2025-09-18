
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { auth } from '@/lib/firebase';
import { isFirebaseEnabled } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithRedirect, signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Zap, BrainCircuit, Bot } from 'lucide-react';
import { LogoSvg, GoogleIcon } from '@/components/icons';

export default function LoginPage() {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    setAuthError(null);
    if (!isFirebaseEnabled || !auth) {
      setAuthError("Firebase is not configured correctly. Please contact support.");
      setIsSigningIn(false);
      return;
    }
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
        await signInWithRedirect(auth, provider);
    } catch(error: any) {
        setAuthError(error.message);
        setIsSigningIn(false);
    }
  };
  
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSigningIn(true);
    setAuthError(null);
    if (!isFirebaseEnabled || !auth) {
      setAuthError("Firebase is not configured.");
      setIsSigningIn(false);
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      setAuthError(error.message);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <LogoSvg className="h-8 w-8 text-primary" />
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
          Your AI Agent for Unrivaled Productivity
        </h1>
        <p className="mt-3 max-w-md mx-auto text-lg text-muted-foreground sm:text-xl md:mt-5 md:max-w-2xl">
          Xeref.ai supercharges your productivity with AI Agents that work 24/7 on your tasks.
        </p>
        
        <div className="mt-10 w-full max-w-sm">
          <Button onClick={handleGoogleSignIn} disabled={isSigningIn || !isFirebaseEnabled} size="lg" className="w-full">
            {isSigningIn ? <Loader2 className="h-6 w-6 animate-spin" /> : <><GoogleIcon className="mr-2 h-6 w-6" />Continue with Google</>}
          </Button>
           <div className="my-4 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-sm text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <form onSubmit={handleEmailSignIn}>
            <div className="grid gap-y-4">
              <div>
                <Label htmlFor="email" className="sr-only">Email</Label>
                <Input type="email" id="email" name="email" placeholder="Email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" />
              </div>
              <div>
                <Label htmlFor="password"className="sr-only">Password</Label>
                <Input type="password" id="password" name="password" placeholder="Password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full" />
              </div>
              {authError && (
                <Alert variant="destructive" className="text-left">
                  <AlertDescription>{authError}</AlertDescription>
                </Alert>
              )}
              <div>
                <Button type="submit" className="w-full" variant="outline" disabled={isSigningIn}>
                  {isSigningIn ? <Loader2 className="h-6 w-6 animate-spin" /> : 'Sign In'}
                </Button>
              </div>
            </div>
          </form>
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg italic text-muted-foreground">"Xeref.ai has transformed the way I manage my projects. It's like having a dedicated assistant 24/7."</p>
          <p className="mt-2 font-semibold">- A Happy User</p>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 text-center">
            <div>
                <Zap className="h-8 w-8 mx-auto text-primary" />
                <p className="mt-2 font-semibold">AI Prioritization</p>
            </div>
            <div>
                <BrainCircuit className="h-8 w-8 mx-auto text-primary" />
                <p className="mt-2 font-semibold">Automated Research</p>
            </div>
            <div>
                <Bot className="h-8 w-8 mx-auto text-primary" />
                <p className="mt-2 font-semibold">24/7 Agents</p>
            </div>
        </div>
      </main>

      <footer className="py-8 px-4 sm:px-6 lg:px-8 text-center border-t border-border">
        <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
          <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Xeref.ai. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
