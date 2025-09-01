
'use client';

import React, { useState, FormEvent } from 'react';
import { useAuth } from '@/lib/auth';
import { Loader2 } from 'lucide-react';
import { type Message } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";
import { Sidebar } from '@/components/dashboard/sidebar';
import { CenterPanel } from '@/components/dashboard/center-panel';
import { RightPanel } from '@/components/dashboard/right-panel';
import { dashboardConfig } from '@/lib/dashboard-config';

type Source = {
  url: string;
  title?: string;
  summary?: string;
};

export default function DashboardPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isBotLoading, setIsBotLoading] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [sources, setSources] = useState<Source[]>([]);
  const [isSummarizing, setIsSummarizing] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState('chat');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  const handleSendMessage = (message: string) => {
    if (!message.trim() || isBotLoading) return;
    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: message };
    setMessages((prev) => [...prev, userMessage]);
    setIsBotLoading(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `This is a simulated response to: "${userMessage.content}"`,
        model: 'Gemini 2.5 Flash',
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsBotLoading(false);
    }, 1500);
  };

  const handleAddUrl = (e: FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    setSources([...sources, { url: urlInput }]);
    toast({ title: "URL Added", description: `The URL "${urlInput}" has been added as a source.` });
    setUrlInput('');
  };

  const handleRemoveSource = (index: number) => {
    setSources(sources.filter((_, i) => i !== index));
  };

  const handleSummarize = async (url: string, index: number) => {
    setIsSummarizing(prev => ({ ...prev, [url]: true }));
    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Failed to summarize the URL.');

      const { summary, title } = data;
      const updatedSources = [...sources];
      updatedSources[index].summary = summary;
      updatedSources[index].title = title;
      setSources(updatedSources);

      toast({ title: "Summarization Successful", description: `Successfully summarized "${url}".` });
    } catch (error) {
      toast({ title: "Summarization Failed", description: (error as Error).message, variant: "destructive" });
    } finally {
      setIsSummarizing(prev => ({ ...prev, [url]: false }));
    }
  };

  if (isAuthLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const gridClasses = `h-screen w-screen grid transition-all duration-300 ${
    isSidebarCollapsed
      ? 'grid-cols-[4rem_minmax(0,1fr)_20rem]'
      : 'grid-cols-[16rem_minmax(0,1fr)_20rem]'
  }`;


  return (
    <div className={gridClasses}>
      <Sidebar isCollapsed={isSidebarCollapsed} toggleCollapse={toggleSidebar} />
      <CenterPanel
        messages={messages}
        onSendMessage={handleSendMessage}
        isBotThinking={isBotLoading}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <RightPanel
        activeTab={activeTab}
        sources={sources}
        urlInput={urlInput}
        setUrlInput={setUrlInput}
        handleAddUrl={handleAddUrl}
        handleRemoveSource={handleRemoveSource}
        handleSummarize={handleSummarize}
        isSummarizing={isSummarizing}
      />
    </div>
  );
}
