
// src/app/pricing/page.tsx
"use client";

import Link from 'next/link';
import { Check, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { auth, isFirebaseEnabled } from '@/lib/firebase';
import { onAuthStateChanged, User } from "firebase/auth";
import { isUltraUser } from '@/lib/auth-utils';

const pricingData = {
    plans: [
      {
        name: "Free",
        price: "$0",
        isCurrent: true,
        features: [
          "Tasks and Notes",
          "Perplexity Web Search",
          "Limited AI Agent access",
          "Background Agent (max 2 tasks)",
        ],
        buttonText: "Free Plan",
      },
      {
        name: "Pro",
        price: "$180",
        period: "/year",
        features: [
          "Everything in Free plan",
          "Premium AI Models",
          "Unlimited Background Agent",
          "15X more Ultra Search",
          "Premium support on Discord",
          "Cancel anytime",
          "VIP Onboarding Call",
        ],
        buttonText: "Upgrade to Pro",
        hasToggle: true,
      },
      {
        name: "Team",
        price: "$360",
        period: "/user/month",
        features: [
          "Everything in Pro plan",
          "2X limits for everyone",
          { text: "Team projects", new: true },
          "Admin dashboard",
          "Personalized onboarding",
          "Centralized billing",
          "Advanced prompt settings",
          "Save $120 a year",
        ],
        buttonText: "Upgrade to Team",
        hasToggle: true,
        hasSlider: true,
      },
      {
        name: "Ultra",
        price: "$800",
        period: "/year",
        features: [
          "Everything in Pro plan",
          { text: "MCP support", new: true },
          "10X higher Chat Limits",
          { text: "Claude 4 Opus", new: true },
          "VIP Discord channels",
          "GPT 4.5",
          "Faster AI inference",
          { text: "o3 pro", new: true },
          "Save $400 a year",
        ],
        buttonText: "Upgrade to Ultra",
      },
    ],
  };

export default function PricingPage() {
    const [user, setUser] = useState<User | null>(null);
    const [isAnnualPro, setIsAnnualPro] = useState(true);
    const [isAnnualTeam, setIsAnnualTeam] = useState(true);
    const [seats, setSeats] = useState(3);

    useEffect(() => {
        if (!isFirebaseEnabled || !auth) return;
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const isAdmin = isUltraUser(user);

    return (
        <div className="bg-black text-white min-h-screen p-4 sm:p-8">
            <div className="absolute top-4 left-4">
                <Button asChild variant="ghost" className="text-gray-400 hover:text-white">
                    <Link href="/">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to app
                    </Link>
                </Button>
            </div>
            <div className="container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-100">Upgrade your plan</h1>
                    <p className="text-gray-400 mt-2">Cancel anytime. All features included.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                  {pricingData.plans.map((plan) => {
                    const isCurrentPlan = isAdmin ? plan.name === 'Ultra' : plan.isCurrent;
                    const isHighlighted = (isAdmin && plan.name === 'Ultra') || (!isAdmin && plan.name === 'Pro');
                    
                    return (
                    <div
                      key={plan.name}
                      className={cn(
                        "bg-[#111111] border rounded-xl p-6 flex flex-col",
                        isHighlighted ? "border-purple-500" : "border-gray-800"
                      )}
                    >
                        <div className="flex items-center gap-2">
                           <h2 className="text-xl font-semibold text-gray-100">{plan.name}</h2>
                           {isCurrentPlan && <Check className="h-5 w-5 text-green-500" />}
                        </div>
                      
                      <div className="my-6">
                        <span className="text-5xl font-bold text-white">
                          {plan.price}
                        </span>
                        {plan.period && <span className="text-gray-400 text-sm">{plan.period}</span>}
                      </div>

                      <ul className="space-y-3 text-sm flex-grow">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <Check className="text-green-500 mr-3 mt-1 h-4 w-4 flex-shrink-0" />
                            <span className="text-gray-300">
                                {typeof feature === 'string' ? feature : feature.text}
                                {typeof feature !== 'string' && feature.new && (
                                    <Badge variant="secondary" className="ml-2 bg-blue-500 text-white border-transparent">NEW</Badge>
                                )}
                            </span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-8">
                        {plan.hasSlider && (
                           <div className="my-6">
                                <Slider
                                    defaultValue={[seats]}
                                    max={20}
                                    min={2}
                                    step={1}
                                    onValueChange={(value) => setSeats(value[0])}
                                />
                                <div className="flex justify-between text-xs text-gray-400 mt-2">
                                   <span>2</span>
                                   <span>3</span>
                                   <span>4</span>
                                   <span>5</span>
                                   <span>10</span>
                                   <span>15</span>
                                   <span>20</span>
                                </div>
                                <div className="text-center text-sm font-semibold text-white mt-2">{seats} seats</div>
                           </div>
                        )}

                        {plan.hasToggle && (
                            <div className="flex items-center space-x-2 my-6">
                                <Switch
                                    id={`${plan.name}-annual`}
                                    checked={plan.name === 'Pro' ? isAnnualPro : isAnnualTeam}
                                    onCheckedChange={plan.name === 'Pro' ? setIsAnnualPro : setIsAnnualTeam}
                                />
                                <label htmlFor={`${plan.name}-annual`} className="text-sm text-gray-300">Annual</label>
                            </div>
                        )}
                        
                         <Button
                          className={cn(
                            "w-full font-semibold",
                            isCurrentPlan ? "bg-gray-800 text-gray-400 cursor-not-allowed" : "bg-white text-black hover:bg-gray-200"
                          )}
                          disabled={isCurrentPlan}
                        >
                          {isCurrentPlan ? 'Current Plan' : plan.buttonText}
                        </Button>
                      </div>
                    </div>
                  )})}
                </div>
            </div>
        </div>
    );
}
