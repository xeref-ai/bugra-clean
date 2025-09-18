
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Mic, Plus, Bot, User } from 'lucide-react';
import { type Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import { LogoSvg } from '@/components/icons';

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
  const scrollAreaRef = useRef<HTMLDivElement>(null);

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
                className={cn(
                  'flex items-start gap-3',
                  message.role === 'user' ? 'justify-end' : ''
                )}
              >
                {message.role === 'assistant' && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="Xeref AI" />
                    <AvatarFallback>
                      <Bot />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-[75%] rounded-2xl px-4 py-3',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )}
                >
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
                {message.role === 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback>
                      <User />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isBotThinking && (
                <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" alt="Xeref AI" />
                        <AvatarFallback>
                            <Bot />
                        </AvatarFallback>
                    </Avatar>
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
        <div className="relative">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask Xeref.ai..."
            className="w-full resize-none rounded-lg border bg-background py-3 pl-12 pr-20 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
            rows={1}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-4">
            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
              <Plus />
            </Button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground mr-2">
              <Mic />
            </Button>
            <Button size="sm" onClick={handleSendMessage} disabled={!inputValue.trim()}>
              Send
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
