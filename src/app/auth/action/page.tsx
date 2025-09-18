
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { applyActionCode, confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

const ActionHandler = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'resetPassword'>('loading');
  const [message, setMessage] = useState('Verifying...');
  const [newPassword, setNewPassword] = useState('');
  
  const mode = searchParams.get('mode');
  const actionCode = searchParams.get('oobCode');

  useEffect(() => {
    if (!mode || !actionCode) {
      setStatus('error');
      setMessage('Invalid action link. Please try again.');
      return;
    }

    const handleAction = async () => {
      try {
        switch (mode) {
          case 'verifyEmail':
            await applyActionCode(auth, actionCode);
            setStatus('success');
            setMessage('Your email has been successfully verified! You can now log in.');
            break;
          case 'resetPassword':
            await verifyPasswordResetCode(auth, actionCode);
            setStatus('resetPassword');
            setMessage('Please enter your new password.');
            break;
          default:
            setStatus('error');
            setMessage('Unsupported action. Please try again.');
        }
      } catch (error) {
        setStatus('error');
        setMessage('This link is invalid or has expired. Please try again.');
      }
    };

    handleAction();
  }, [mode, actionCode]);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actionCode || newPassword.length < 6) {
        setMessage('Password must be at least 6 characters.');
        return;
    }
    try {
        await confirmPasswordReset(auth, actionCode, newPassword);
        setStatus('success');
        setMessage('Your password has been reset successfully. You can now log in.');
    } catch (error) {
        setStatus('error');
        setMessage('Failed to reset password. The link may have expired.');
    }
  };

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="flex flex-col items-center text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-lg">{message}</p>
          </div>
        );
      case 'success':
        return (
          <div className="flex flex-col items-center text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
            <p className="text-lg">{message}</p>
            <Button asChild className="mt-6">
              <Link href="/login">Go to Login</Link>
            </Button>
          </div>
        );
      case 'error':
        return (
          <div className="flex flex-col items-center text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <p className="text-lg">{message}</p>
             <Button asChild className="mt-6">
              <Link href="/login">Back to Login</Link>
            </Button>
          </div>
        );
      case 'resetPassword':
        return (
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
            <p className="text-center text-muted-foreground mb-6">{message}</p>
            <form onSubmit={handlePasswordReset}>
              <div className="grid gap-y-4">
                <div>
                  <Label htmlFor="password">New Password</Label>
                  <Input 
                    type="password" 
                    id="password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required 
                  />
                </div>
                <Button type="submit">Set New Password</Button>
              </div>
            </form>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="p-8 rounded-lg shadow-xl w-full max-w-md">
            {renderContent()}
        </div>
    </div>
  );
};

// Use Suspense to handle the useSearchParams hook
const AuthActionPage = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <ActionHandler />
    </Suspense>
);


export default AuthActionPage;
