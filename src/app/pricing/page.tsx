
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function PricingPage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async () => {
    setIsLoading(true);
    if (!user) {
      // Redirect to login or show a message
      return;
    }

    try {
      const functions = getFunctions();
      const createCheckoutSession = httpsCallable(functions, 'createCheckoutSession');
      const result = await createCheckoutSession({
        plan: 'pro',
        success_url: `${window.location.origin}/home?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${window.location.origin}/pricing`,
      });

      const { sessionId } = result.data as { sessionId: string };
      
      const stripe = await stripePromise;
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Choose Your Plan</h1>
        <div className="max-w-md mx-auto bg-card p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Xeref.ai Pro</h2>
          <p className="text-4xl font-bold mb-4">$20 <span className="text-lg font-normal">/ month</span></p>
          <ul className="space-y-2 mb-8">
            <li>Unlimited Tasks</li>
            <li>Unlimited Ideas</li>
            <li>Advanced AI Models</li>
            <li>Priority Support</li>
          </ul>
          <Button onClick={handleUpgrade} disabled={isLoading} className="w-full">
            {isLoading ? <Loader2 className="animate-spin" /> : 'Upgrade to Pro'}
          </Button>
        </div>
      </div>
    </div>
  );
}
