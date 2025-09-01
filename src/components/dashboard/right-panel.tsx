
'use client';

import React from 'react';
import { dashboardConfig } from '@/lib/dashboard-config';
import { Button } from '@/components/ui/button';
import { Source, SourceList } from '@/components/source-list'; // Assuming this component exists and is adapted

export function RightPanel({ 
    activeTab,
    sources,
    urlInput,
    setUrlInput,
    handleAddUrl,
    handleRemoveSource,
    handleSummarize,
    isSummarizing
}: { 
    activeTab: string;
    sources: Source[];
    urlInput: string;
    setUrlInput: (value: string) => void;
    handleAddUrl: (e: React.FormEvent) => void;
    handleRemoveSource: (index: number) => void;
    handleSummarize: (url: string, index: number) => void;
    isSummarizing: Record<string, boolean>;
}) {
  const { timeline, quickActions } = dashboardConfig.rightPanel;

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return (
          <>
            <div className="flex items-center justify-between mb-4">
              {quickActions && quickActions.map(action => (
                <Button key={action.id} variant={action.style === 'accent' ? 'default' : 'ghost'}>
                    {action.label}
                </Button>
              ))}
            </div>
            <div className="flex-1 overflow-y-auto space-y-4">
              {timeline && timeline.groups && timeline.groups.map(group => (
                <div key={group.id}>
                  <h3 className="text-[var(--muted-color)] font-medium text-xs uppercase mb-2">{group.label}</h3>
                  {group.items.length > 0 ? (
                    <ul className="space-y-2">
                      {group.items.map(item => (
                        <li key={item.id} className="p-3 bg-[var(--bg-color)] rounded-lg">
                          <div className="text-sm font-medium text-[var(--text-color)]">{item.title}</div>
                          {item.subtitle && <div className="text-xs text-[var(--muted-color)]">{item.subtitle}</div>}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-[var(--muted-color)] italic">No items</p>
                  )}
                </div>
              ))}
            </div>
          </>
        );
      case 'ideas': return <div>Ideas Content</div>;
      case 'tasks': return <div>Tasks Content</div>;
      case 'notes': return <div>Notes Content</div>;
      default: return null;
    }
  };

  return (
    <div className="bg-[var(--panel-color)] border-l border-[var(--border-color)] p-4 flex flex-col h-full">
      {renderContent()}
    </div>
  );
};
