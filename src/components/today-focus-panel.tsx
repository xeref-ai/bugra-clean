import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Zap, Target, Rocket } from 'lucide-react';

const TodayFocusPanel = () => {
  return (
    <div className="h-full bg-black text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Today's Focus: October 03, 2025</h2>
      <Separator className="bg-gray-700" />

      {/* Q4 Goals */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold flex items-center"><Rocket className="mr-2 h-5 w-5" />Q4 Goals: The Next Horizon</h3>
        <ul className="list-none space-y-2 mt-2">
          <li className="flex items-start"><CheckCircle className="text-green-500 mr-2 mt-1 h-4 w-4 flex-shrink-0" /> Launch CI/CD pipeline for automated, consistent deployments.</li>
          <li className="flex items-start"><CheckCircle className="text-green-500 mr-2 mt-1 h-4 w-4 flex-shrink-0" /> Harden security by reviewing Firestore rules and auditing secrets.</li>
          <li className="flex items-start"><CheckCircle className="text-gray-500 mr-2 mt-1 h-4 w-4 flex-shrink-0" /> Optimize Next.js bundle size and review Cloud Run scaling.</li>
        </ul>
      </div>

      <Separator className="my-6 bg-gray-700" />

      {/* Playbook Shortcuts */}
      <div>
        <h3 className="text-lg font-semibold flex items-center"><Zap className="mr-2 h-5 w-5" />Playbook Shortcuts</h3>
        <ul className="list-none space-y-2 mt-2 text-sm">
          <li><kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Ctrl</kbd> + <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">M</kbd> - Open Microphone</li>
          <li><kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Ctrl</kbd> + <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">E</kbd> - Generate Explanation</li>
          <li><kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Ctrl</kbd> + <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">R</kbd> - Reset Chat</li>
        </ul>
      </div>

      <Separator className="my-6 bg-gray-700" />

      {/* Archived Q3 */}
      <div>
        <h3 className="text-lg font-semibold flex items-center text-gray-500"><Target className="mr-2 h-5 w-5" />Archived: Q3 Achievements</h3>
        <ul className="list-disc list-inside space-y-2 mt-2 text-gray-400">
          <li>Successfully integrated multiple AI agents.</li>
          <li>Implemented AI-powered task difficulty ranking.</li>
          <li>Resolved critical microphone permission and Firestore connectivity bugs.</li>
        </ul>
      </div>

    </div>
  );
};

export default TodayFocusPanel;
