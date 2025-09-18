
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Info, Pin } from 'lucide-react';
import { cn } from '@/lib/utils';

const Hexagon = ({ className }: { className?: string }) => (
  <div className={cn("relative w-16 h-[92.38px] bg-gray-700/50 clip-path-hexagon", className)}></div>
);

const InfoCard = ({ title }: { title: string }) => (
    <div className="w-48 h-32 bg-gray-800/50 rounded-lg flex flex-col items-center justify-center p-4">
        <Info className="h-6 w-6 text-gray-400 mb-2" />
        <p className="text-sm text-gray-400 text-center">{title}</p>
    </div>
);

export const TeamBuilderView = () => {
    const [teamName, setTeamName] = useState('');

    return (
        <div className="bg-[#1e2024] text-gray-300 flex flex-col h-full w-full p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 flex-shrink-0">
                <Input
                    placeholder="Team Name..."
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="bg-input border-border max-w-xs"
                />
                <div className="flex items-center space-x-2">
                    <Button variant="outline">Save Team</Button>
                    <Button variant="ghost">Clear Team</Button>
                    <Button variant="ghost" size="icon">
                        <Pin />
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow flex items-center justify-center gap-8">
                <InfoCard title="No active synergies" />

                <div className="grid grid-cols-5 gap-2">
                    {Array.from({ length: 25 }).map((_, i) => (
                        <Hexagon key={i} />
                    ))}
                </div>

                <InfoCard title="No equipped items" />
            </div>
        </div>
    );
};
