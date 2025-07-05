
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { app, auth, isFirebaseEnabled } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Copy, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/auth';

const LogoSvg = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} data-ai-hint="logo compass">
    <path d="M12 2L4 20L12 16L20 20L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const GoogleIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd">
            <path d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.54C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.63 5.05 6.63 3.48 9 3.48z" fill="#EA4335"></path>
            <path d="M17.64 9.2c0-.74-.06-1.28-.19-1.82H9v3.45h4.84c-.2 1.04-.76 1.96-1.53 2.6l2.91 2.26c1.7-1.56 2.69-3.88 2.69-6.49z" fill="#4285F4"></path>
            <path d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z" fill="#FBBC05"></path>
            <path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.26c-.8.54-1.82.88-3.05.88-2.34 0-4.35-1.52-5.05-3.55H.96v2.33A9.007 9.007 0 0 0 9 18z" fill="#34A853"></path>
            <path d="M0 0h18v18H0z"></path>
        </g>
    </svg>
);

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, isLoading: isAuthLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<{ title: string; description: string; domain?: string } | null>(null);

  const handleGoogleSignIn = async () => {
    if (user) {
        router.push('/');
        return;
    }

    setIsLoading(true);
    setAuthError(null);
    if (!isFirebaseEnabled || !auth) {
      setAuthError({
        title: "Configuration Error",
        description: "Firebase is not configured. Please contact support."
      });
      setIsLoading(false);
      return;
    }
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // The onAuthStateChanged listener in AuthProvider will handle the redirect
    } catch (error: any) {
      console.error("Error signing in with Google: ", error);
       if (error.code === 'auth/unauthorized-domain') {
        const domain = window.location.hostname;
        setAuthError({
            title: "Domain Not Authorized",
            description: "This app's domain is not authorized for sign-in. Please add the domain below to the 'Authorized domains' list in your Firebase project's Authentication settings.",
            domain: domain
        });
      } else if (error.code === 'auth/popup-closed-by-user') {
        console.log("Sign-in popup closed by user.");
      } else {
        setAuthError({
            title: "Sign-in Failed",
            description: `An unexpected error occurred: ${error.message} (${error.code})`,
        });
      }
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
        toast({
            description: "Domain copied to clipboard.",
        });
    });
  };

  if (isAuthLoading || user) {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-background">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <LogoSvg className="h-8 w-8 text-primary" />
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
          What if AI Agents could save you <br className="hidden sm:inline" />
          <span className="text-primary">20 hours</span> a week?
        </h1>
        <p className="mt-3 max-w-md mx-auto text-lg text-muted-foreground sm:text-xl md:mt-5 md:max-w-2xl">
          Xeref.ai supercharges your productivity with AI Agents that work 24/7 on your tasks - using the world's smartest AI models.
        </p>
        
        {authError && (
          <Alert variant="destructive" className="mt-8 max-w-lg mx-auto text-left">
            <AlertTitle>{authError.title}</AlertTitle>
            <AlertDescription>
                {authError.description}
                {authError.domain && (
                    <div className="mt-4 p-3 bg-red-900/50 rounded-md flex items-center justify-between">
                        <code className="font-mono text-sm">{authError.domain}</code>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-white hover:bg-red-800"
                            onClick={() => handleCopy(authError.domain!)}
                        >
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </AlertDescription>
          </Alert>
        )}

        <div className="mt-10">
          <Button 
            onClick={handleGoogleSignIn} 
            disabled={isLoading || !isFirebaseEnabled}
            size="lg"
            className="w-full max-w-xs bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 shadow-sm text-base font-medium py-3 px-6 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
                <Loader2 className="mr-3 h-5 w-5 animate-spin" />
            ) : (
                <GoogleIcon className="mr-3 h-5 w-5" />
            )}
            Sign in with Google
          </Button>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Start using Xeref.ai <span className="text-primary font-medium">now for free</span>
        </p>

        <div className="mt-12 w-full max-w-2xl aspect-video bg-muted/50 rounded-lg flex items-center justify-center border border-border shadow-lg" data-ai-hint="product showcase video">
          <LogoSvg className="h-48 w-48 text-primary" />
        </div>
      </main>

      <footer className="py-8 px-4 sm:px-6 lg:px-8 text-center border-t border-border">
        <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
          <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
          <Link href="/hiring" className="hover:text-primary">We're Hiring!</Link>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Xeref.ai. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
