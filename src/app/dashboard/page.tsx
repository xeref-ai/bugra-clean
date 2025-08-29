
'use client';

import React, { useState, FormEvent, useRef } from 'react';
import { useAuth } from '@/lib/auth';
import { Loader2 } from 'lucide-react';
import { IconSidebar } from '@/components/icon-sidebar';
import { NewProjectView } from '@/components/new-project-view';
import { EditProjectView } from '@/components/edit-project-view';
import { ChatInterface } from '@/components/chat/chat-interface';
import { cn } from '@/lib/utils';
import { type Message } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type RightPanelView = 'new-project' | 'edit-project' | null;

type AppSettings = {
  model: string;
  temperature: number;
  systemPrompt: string;
  useWebSearch: boolean;
};

export default function DashboardPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeRightView, setActiveRightView] = useState<RightPanelView>(null);

  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [sources, setSources] = useState<string[]>([]);

  const handleSendMessage = (message: string) => {
    if (!message.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `This is a simulated response to: "${userMessage.content}"`,
        model: 'Gemini 2.5 Flash',
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleAddUrl = (e: FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    setSources([...sources, urlInput]);
    toast({
      title: "URL Added",
      description: `The URL "${urlInput}" has been added as a source.`,
    });
    setUrlInput('');
  };

  if (isAuthLoading) {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-background">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    );
  }

  return (
    <div className="flex h-screen w-screen bg-background text-foreground overflow-hidden">
      <div className="w-1/2 border-r border-gray-800 p-4">
        <h1 className="text-2xl font-bold">Backend (bugrakarsli.com)</h1>
        {/* Placeholder for backend content */}
      </div>
      <div className="w-1/2 flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-4">Frontend (xeref.ai)</h1>
        
        <div className="mb-4">
          <Card>
            <CardHeader>
              <CardTitle>NotebookLM Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddUrl} className="flex gap-2 mb-4">
                <Input
                  type="url"
                  placeholder="Paste in Web URLs to upload as sources..."
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="flex-grow"
                />
                <Button type="submit">Add Source</Button>
              </form>
              <div>
                <h3 className="text-md font-semibold mb-2">Added Sources:</h3>
                <ul className="list-disc list-inside">
                  {sources.map((source, index) => (
                    <li key={index} className="truncate">
                      <a href={source} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {source}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex-grow border-t border-gray-800 pt-4">
            <ChatInterface
                messages={messages}
                onSendMessage={handleSendMessage}
                isBotThinking={isLoading}
            />
        </div>
      </div>
    </div>
  );
}
