
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, GitBranch, Play } from 'lucide-react';
import { ExecutionsView } from './executions-view';
import { cn } from '@/lib/utils';

export const WorkflowView = ({ onClose }: { onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'executions'>('all');

  return (
    <div className="h-full flex flex-col bg-[#1E1F22] text-white">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold">Workflows</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="p-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className={cn(
              'bg-transparent border-gray-600 hover:bg-gray-700',
              activeTab === 'all' && 'bg-white text-black hover:bg-gray-200'
            )}
            onClick={() => setActiveTab('all')}
          >
            <GitBranch className="mr-2 h-4 w-4" />
            All
          </Button>
          <Button
            variant="outline"
            className={cn(
              'bg-transparent border-gray-600 hover:bg-gray-700',
              activeTab === 'executions' && 'bg-white text-black hover:bg-gray-200'
            )}
            onClick={() => setActiveTab('executions')}
          >
            <Play className="mr-2 h-4 w-4" />
            Executions
          </Button>
        </div>
      </div>

      <div className="flex-grow">
        {activeTab === 'all' && (
          <div className="flex flex-col items-center justify-center h-full text-center">
             <div className="bg-gray-800 rounded-full p-3">
                <GitBranch className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="mt-4 text-lg font-medium">No workflows yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Create custom Workflows to automate your work
            </p>
            <Button className="mt-4 bg-white text-black hover:bg-gray-200">
                Add Workflow
            </Button>
          </div>
        )}
        {activeTab === 'executions' && <ExecutionsView />}
      </div>
    </div>
  );
};
