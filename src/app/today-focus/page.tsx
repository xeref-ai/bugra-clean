
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { X, Edit, Info, Target, CheckSquare, Check } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const dailySuggestions = [
    "Dedicate focused deep work time to advancing the AI integration for browser usage, as this directly supports your innovation and financial freedom goals.",
    "Tackle the most complex bug first. The momentum will carry you through the day.",
    "Outline the architecture for the trading bot MVP. A solid foundation is crucial.",
    "Spend a session refining the UI/UX for the browser extension. First impressions matter.",
    "Research a new AI technique that could enhance your projects. Stay ahead of the curve.",
    "Draft the marketing copy for your upcoming launch. A clear message attracts users.",
    "Review and refactor a piece of old code. Continuous improvement is the key to quality.",
];

const TodayFocusPage = () => {
  const [isEditingGoals, setIsEditingGoals] = useState(false);
  const [goalsText, setGoalsText] = useState(
    "As an electrical-electronic engineer deeply involved in local projects, my immediate agenda is twofold. I'm driving innovation by integrating AI to transform browser usage while simultaneously building a robust trading bot MVP. Backed by focused 90-minute deep work sessions, these initiatives are my stepping stones toward achieving financial freedom within the next year."
  );
  const [priorityText, setPriorityText] = useState('');
  const [dailySuggestion, setDailySuggestion] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // This runs only on the client, after hydration, to prevent mismatches.
    const dayOfYear = Math.floor((new Date().valueOf() - new Date(new Date().getFullYear(), 0, 0).valueOf()) / (1000 * 60 * 60 * 24));
    setDailySuggestion(dailySuggestions[dayOfYear % dailySuggestions.length]);
  }, []); // Empty dependency array ensures this runs once on mount

  const handleSave = () => {
    // In a real app, this would save to a backend.
    // For now, we'll just show a toast notification.
    console.log("Saved Data:", { priority: priorityText, goals: goalsText });
    toast({
      title: "Focus Saved",
      description: "Your priority for today has been saved successfully.",
    });
  };

    const handleToggleEditGoals = () => {
    if (isEditingGoals) {
      // In a real app, you'd save the goalsText state to your backend here
      toast({
        title: "Goals Updated",
        description: "Your goals have been updated.",
      });
    }
    setIsEditingGoals(!isEditingGoals);
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-black/80 p-4">
      <div className="w-full max-w-4xl bg-[#1e2024] text-gray-200 rounded-lg shadow-2xl p-8 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-white">What's your main priority today?</h1>
            <div className="h-1 w-24 bg-[#00f0a0] mt-1"></div>
          </div>
          <Link href="/" passHref>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <X className="h-6 w-6" />
            </Button>
          </Link>
        </div>

        {/* Priority Input */}
        <div className="mb-6 relative">
          <Textarea
            value={priorityText}
            onChange={(e) => setPriorityText(e.target.value)}
            placeholder="focus for today's task"
            className="bg-[#2a2d31] border border-teal-500/50 rounded-md p-4 h-28 resize-none focus:ring-teal-500 focus:border-teal-500 text-gray-200"
          />
          <div className="mt-3 bg-[#2a2d31] p-3 rounded-md text-sm text-gray-400 border-l-2 border-teal-500/80 flex justify-between items-start">
             {dailySuggestion ? (
                <p className="italic">
                    "{dailySuggestion}" - Xeref Agent
                </p>
             ) : (
                <p className="italic">Loading today's suggestion...</p>
             )}
            <Button variant="ghost" size="icon" className="h-6 w-6 -mt-1 -mr-1 text-gray-500 hover:text-white flex-shrink-0">
              <X size={16} />
            </Button>
          </div>
        </div>

        {/* Goals and Tasks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Current Goals Card */}
          <div className="bg-[#2a2d31] p-6 rounded-lg border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center space-x-2">
                <Target className="text-purple-400" size={20} />
                <h2 className="text-lg font-semibold text-white">Current Goals</h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white h-8 w-8"
                onClick={handleToggleEditGoals}
              >
                {isEditingGoals ? <Check size={16} /> : <Edit size={16} />}
              </Button>
            </div>
            {isEditingGoals ? (
              <Textarea
                value={goalsText}
                onChange={(e) => setGoalsText(e.target.value)}
                className="bg-[#3a3d41] border border-purple-500/50 rounded-md p-2 h-40 resize-none focus:ring-purple-500 focus:border-purple-500 text-sm text-gray-300 leading-relaxed"
              />
            ) : (
              <p className="text-sm text-gray-300 leading-relaxed">
                {goalsText}
              </p>
            )}
          </div>

          {/* Top Tasks Card */}
          <div className="bg-[#2a2d31] p-6 rounded-lg border border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-2">
                    <CheckSquare className="text-blue-400" size={20} />
                    <h2 className="text-lg font-semibold text-white">Top Tasks</h2>
                </div>
            </div>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
                <li>How to implement chat and agent mode step-by-step</li>
                <li>How to implement chat and agent mode step-by-step</li>
                <li>Determine the purpose of 'hey'</li>
                <li>Create e-sim for Thailand</li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Info size={20} />
            </Button>
            <div className="flex space-x-4">
                <Button variant="outline" className="bg-transparent border-gray-600 hover:bg-gray-700 text-gray-300">Cancel</Button>
                <Button onClick={handleSave} className="bg-gray-300 hover:bg-white text-black font-semibold">Save</Button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TodayFocusPage;
