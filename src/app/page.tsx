
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

type RightPanelView = 'new-project' | 'edit-project' | null;

type AppSettings = {
  model: string;
  temperature: number;
  systemPrompt: string;
  useWebSearch: boolean;
};

export default function AppPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeRightView, setActiveRightView] = useState<RightPanelView>(null);

  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatMode, setChatMode] = useState<'chat' | 'agent' | 'ultra-search'>('agent');
  const [settings, setSettings] = useState<AppSettings>({
    model: 'Gemini 2.5 Flash',
    temperature: 0.7,
    systemPrompt: '',
    useWebSearch: false,
  });
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const chatInputRef = useRef<HTMLTextAreaElement>(null);

  const handleSendMessage = (message: string) => {
    if ((!message.trim() && !attachedFile) || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      filePreview: filePreview,
    };

    setMessages((prev) => [...prev, userMessage]);
    setFilePreview(null);
    setAttachedFile(null);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `This is a simulated response to: "${userMessage.content}"`,
        model: settings.model,
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };


  if (isAuthLoading) {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-background">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    );
  }
  
  const handleSetRightView = (view: RightPanelView) => {
    if (activeRightView === view) {
      setActiveRightView(null); // Toggle off if the same view is clicked
    } else {
      setActiveRightView(view);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-background text-foreground overflow-hidden">
      <IconSidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!isSidebarCollapsed)}
        onNewProjectClick={() => handleSetRightView('new-project')}
        onEditProjectClick={() => handleSetRightView('edit-project')}
      />
      <div className="flex-grow">
        <ChatInterface
            messages={messages}
            onSendMessage={handleSendMessage}
            isBotThinking={isLoading}
        />
      </div>
       <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          activeRightView ? "w-[450px]" : "w-0"
        )}
      >
        {activeRightView === 'new-project' && <NewProjectView onClose={() => setActiveRightView(null)} />}
        {activeRightView === 'edit-project' && <EditProjectView onClose={() => setActiveRightView(null)} />}
      </div>
    </div>
  );
}
