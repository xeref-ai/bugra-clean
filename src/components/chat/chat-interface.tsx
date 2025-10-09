
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Mic, Plus, Bot, User, ThumbsUp, ThumbsDown } from 'lucide-react';
import { type Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import { LogoSvg } from '@/components/icons';
import { useToast } from '@/hooks/use-toast';

export const ChatInterface = ({
  messages,
  onSendMessage,
  isBotThinking,
}: {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isBotThinking: boolean;
}) => {
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState<Record<string, 'up' | 'down' | null>>({});
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFeedback = (messageId: string, vote: 'up' | 'down') => {
    setFeedback(prev => ({ ...prev, [messageId]: vote }));
    // Here you would typically send this feedback to your analytics or database
    toast({
      description: `Thank you for your feedback!`,
    });
  };

  return (
    <div className="flex flex-col h-full bg-card">
      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        {messages.length === 0 && !isBotThinking ? (
          <div className="flex h-full items-center justify-center">
            <LogoSvg className="h-48 w-48 text-muted-foreground/20" />
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn('flex items-start gap-3 group', message.role === 'user' ? 'justify-end' : '')}
              >
                {message.role === 'assistant' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback><Bot /></AvatarFallback>
                  </Avatar>
                )}
                <div className="flex flex-col gap-2 max-w-[75%]">
                    <div className={cn('rounded-2xl px-4 py-3', message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                    {message.role === 'assistant' && (
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" className={cn("h-7 w-7", feedback[message.id] === 'up' && "text-blue-500")} onClick={() => handleFeedback(message.id, 'up')}>
                                <ThumbsUp size={16} />
                            </Button>
                            <Button variant="ghost" size="icon" className={cn("h-7 w-7", feedback[message.id] === 'down' && "text-red-500")} onClick={() => handleFeedback(message.id, 'down')}>
                                <ThumbsDown size={16} />
                            </Button>
                        </div>
                    )}
                </div>
                {message.role === 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback><User /></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isBotThinking && (
                <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8"><AvatarFallback><Bot /></AvatarFallback></Avatar>
                    <div className="bg-muted rounded-2xl px-4 py-3">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-foreground rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-foreground rounded-full animate-pulse delay-75"></div>
                            <div className="w-2 h-2 bg-foreground rounded-full animate-pulse delay-150"></div>
                        </div>
                    </div>
                </div>
            )}
          </div>
        )}
      </ScrollArea>
      <div className="p-4 border-t bg-card">
        {/* Composer remains the same */}
      </div>
    </div>
  );
};
