
'use client';

import React, { useState, FormEvent } from 'react';
import { useAuth } from '@/lib/auth';
import { Loader2, X } from 'lucide-react';
import { ChatInterface } from '@/components/chat/chat-interface';
import { type Message } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

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
    toast({
      title: "URL Added",
      description: `The URL "${urlInput}" has been added as a source.`,
    });
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

      if (!response.ok) {
        throw new Error(data.error || 'Failed to summarize the URL.');
      }

      const { summary, title } = data;
      const updatedSources = [...sources];
      updatedSources[index].summary = summary;
      updatedSources[index].title = title;
      setSources(updatedSources);

      toast({
        title: "Summarization Successful",
        description: `Successfully summarized the content from "${url}".`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Summarization Failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setIsSummarizing(prev => ({ ...prev, [url]: false }));
    }
  };

  if (isAuthLoading) {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-background">
            <Skeleton className="h-full w-full" />
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
                <ul className="space-y-2">
                  {sources.map((source, index) => (
                    <li key={index} className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline truncate">
                          {source.title || source.url}
                        </a>
                        <Button
                          size="sm"
                          onClick={() => handleSummarize(source.url, index)}
                          disabled={isSummarizing[source.url]}
                        >
                          {isSummarizing[source.url] ? <Loader2 className="h-4 w-4 animate-spin" /> : "Summarize"}
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleRemoveSource(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      {isSummarizing[source.url] && (
                        <div className="mt-2">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-4 w-1/2 mt-2" />
                        </div>
                      )}
                      {source.summary && !isSummarizing[source.url] && (
                        <div className="text-sm text-gray-400 mt-2 p-2 bg-gray-800 rounded">
                          <p className="font-semibold">Summary:</p>
                          <p>{source.summary}</p>
                        </div>
                      )}
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
                isBotThinking={isBotLoading}
            />
        </div>
      </div>
    </div>
  );
}
