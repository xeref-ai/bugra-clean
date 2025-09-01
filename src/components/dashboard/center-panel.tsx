
'use client';

import React from 'react';
import { dashboardConfig } from '@/lib/dashboard-config';
import { icons } from '@/components/icons';
import { ChatInterface } from '@/components/chat/chat-interface';
import { type Message } from '@/lib/types';
import { Button } from '@/components/ui/button';

export function CenterPanel({ messages, onSendMessage, isBotThinking, activeTab, setActiveTab }: {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isBotThinking: boolean;
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}) {
  const { composer, bottomNav, hero } = dashboardConfig.center;

  return (
    <div className="relative flex flex-col h-full bg-[var(--bg-color)]">
      <header className="flex flex-col border-b border-[var(--border-color)]">
        <div className="flex items-center justify-between p-4 text-sm">
          <div className="flex items-center gap-2">
            <Button>{dashboardConfig.layout.header.leftActions[0].label}</Button>
            <Button variant="outline">{dashboardConfig.layout.header.leftActions[1].label}</Button>
          </div>
          <div className="text-[var(--muted-color)] flex items-center space-x-1 group">
            <span>{dashboardConfig.layout.header.rightWidgets[0].text}</span>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col p-8 overflow-y-auto space-y-4">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-16 h-16 text-[var(--accent-color)] mb-4">
              {icons[hero.icon]({ className: 'w-full h-full' })}
            </div>
            <h1 className="text-3xl font-bold text-[var(--text-color)] mb-2">{hero.headline}</h1>
            <Button>{hero.cta.label}</Button>
          </div>
        ) : (
          <ChatInterface messages={messages} onSendMessage={onSendMessage} isBotThinking={isBotThinking} />
        )}
      </main>

      <div className="p-4 border-t border-[var(--border-color)] bg-[var(--panel-color)]">
        <div className="flex items-center justify-between">
          <nav className="flex items-center rounded-full bg-[var(--bg-color)] border border-[var(--border-color)] p-1">
            {bottomNav.tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-full transition-colors duration-200 text-sm font-medium ${activeTab === tab.id ? 'bg-[var(--panel-color)] text-[var(--text-color)]' : 'text-[var(--muted-color)] hover:text-[var(--text-color)]'}`}
              >
                {icons[tab.icon]({ className: 'w-4 h-4 mr-2' })}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--accent-color)] text-[var(--text-color)]">
            {icons[bottomNav.fab.icon]({ className: 'w-5 h-5' })}
          </button>
        </div>
      </div>
    </div>
  );
};
