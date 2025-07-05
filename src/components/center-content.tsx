
'use client';

import React, { FormEvent, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  ArrowUp,
  Target,
  MessageSquare,
  AudioLines,
  Paperclip,
  Search,
  Loader2,
  X,
  FileText,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Edit,
  Ban,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ModelsDialog } from '@/components/models-dialog';
import { type User } from "firebase/auth";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { LogoSvg, SparkleIcon } from '@/components/icons';
import { isUltraUser } from '@/lib/auth-utils';

type AppSettings = {
  model: string;
  temperature: number;
  systemPrompt: string;
  useWebSearch: boolean;
};

export const CenterContent = ({
  user,
  messages,
  input,
  setInput,
  isLoading,
  handleSendMessage,
  chatMode,
  setChatMode,
  settings,
  setSettings,
  chatInputRef,
  filePreview,
  setFilePreview,
  attachedFile,
  setAttachedFile
}: {
  user: User | null;
  messages: Message[];
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  handleSendMessage: (e?: FormEvent) => void;
  chatMode: 'chat' | 'agent' | 'ultra-search';
  setChatMode: (mode: 'chat' | 'agent' | 'ultra-search') => void;
  settings: AppSettings;
  setSettings: (settings: AppSettings) => void;
  chatInputRef: React.RefObject<HTMLTextAreaElement>;
  filePreview: string | null;
  setFilePreview: (preview: string | null) => void;
  attachedFile: File | null;
  setAttachedFile: (file: File | null) => void;
}) => {
    const { toast } = useToast();
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<any>(null);

    const isAdmin = isUltraUser(user);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            toast({
                description: "Message copied to clipboard.",
            });
        }).catch(err => {
            console.error("Failed to copy text: ", err);
            toast({
                title: "Error",
                description: "Could not copy message.",
                variant: "destructive",
            });
        });
    };

    const handleToggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
            return;
        }

        const SpeechRecognitionAPI = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognitionAPI) {
            toast({
                title: "Voice Input Not Supported",
                description: "Your browser does not support the Web Speech API.",
                variant: "destructive",
            });
            return;
        }

        const recognition = new SpeechRecognitionAPI();
        recognitionRef.current = recognition;
        
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onend = () => {
            setIsListening(false);
            recognitionRef.current = null;
        };

        recognition.onerror = (event: any) => {
            console.error("Speech recognition error", event.error);
            if (event.error !== 'no-speech') {
                toast({
                    title: "Voice Input Error",
                    description: `An error occurred: ${event.error}`,
                    variant: "destructive",
                });
            }
            setIsListening(false);
            recognitionRef.current = null;
        };

        recognition.onresult = (event: any) => {
            const transcript = Array.from(event.results)
              .map((result: any) => result[0])
              .map((result) => result.transcript)
              .join('');
            setInput(transcript);
        };
        
        recognition.start();
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.type.startsWith('image/') || file.type === 'application/pdf') {
                setAttachedFile(file);
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setFilePreview(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                } else {
                     setFilePreview('file'); // Use a generic indicator for non-image files
                }
                toast({
                    title: "File Attached",
                    description: `${file.name} is ready to be sent.`,
                });
            } else {
                 toast({
                    title: "Invalid File Type",
                    description: "Please select an image or PDF file.",
                    variant: "destructive",
                });
            }
            if (e.target) e.target.value = '';
        }
    };

    const isSendDisabled = isLoading || (!input.trim() && !filePreview && chatMode !== 'ultra-search');

    return (
        <main className="flex-1 flex flex-col bg-[#1A1D21] text-gray-300 h-full">
            <header className="p-3 flex justify-between items-center h-[57px] pr-6 border-b border-gray-800">
                <div className="flex items-center space-x-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-300 hover:bg-gray-700/50">
                                    <Plus size={18} />
                                </Button>
                            </TooltipTrigger>
                             <TooltipContent>
                              <p>New Chat</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div className="flex items-center space-x-2">
                   {isAdmin ? (
                        <div className="text-sm text-muted-foreground">
                            <span className="hover:text-foreground cursor-pointer">xeref</span>
                            <span> / </span>
                            <span className="text-foreground font-medium">today's tasks</span>
                        </div>
                    ) : (
                        <Button variant="secondary" size="sm" className="bg-white text-black hover:bg-gray-200">
                            <ArrowUp size={14} className="mr-2"/>
                            Upgrade to PRO
                        </Button>
                    )}
                </div>
                <div className="flex items-center space-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link href="/today-focus" passHref>
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-300 hover:bg-gray-700/50">
                               <Target size={18} />
                            </Button>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Today's Focus</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                </div>
            </header>

            <div className="flex-1 flex flex-col p-4 md:p-8 overflow-y-auto">
                 {messages.length === 0 && !filePreview ? (
                    <div className="m-auto flex h-full max-w-lg flex-col items-center justify-center gap-2 text-center">
                        <div
                            className="mb-4 flex size-20 items-center justify-center rounded-2xl bg-primary/10 text-primary"
                            data-ai-hint="logo"
                        >
                            <LogoSvg className="size-10 shrink-0" />
                        </div>
                        <p className="text-base text-white">
                            Think of a digital you no one can take away. xeref.ai
                        </p>
                        <p className="max-w-xs text-sm text-gray-400">
                            I can help you with your daily tasks. Just ask me.
                        </p>
                    </div>
                ) : (
                    <ScrollArea className="flex-1 -mx-8">
                        <div className="px-8 space-y-6">
                            {messages.map((message) => {
                                if (message.role === 'assistant') {
                                    return (
                                        <div key={message.id} className="group relative flex flex-col items-start gap-2">
                                            <div className="flex items-start gap-4">
                                                <Avatar className="h-8 w-8 flex-shrink-0">
                                                    <AvatarFallback className="bg-primary text-primary-foreground">
                                                        <LogoSvg className="h-5 w-5" />
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="rounded-lg px-4 py-3 max-w-[80%] bg-[#2C2D30]">
                                                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 pl-12">
                                                <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <ThumbsUp size={16} />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <ThumbsDown size={16} />
                                                </Button>
                                                 <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={() => handleCopy(message.content)}
                                                    aria-label="Copy message"
                                                >
                                                    <Copy size={16} />
                                                </Button>
                                                {message.model && <span className="text-xs text-gray-500">{message.model}</span>}
                                            </div>
                                        </div>
                                    );
                                }
                                return (
                                    <div key={message.id} className="group relative flex items-start justify-end gap-2">
                                        <div className="flex items-center self-center mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-7 w-7 text-gray-400 hover:text-white"
                                                onClick={() => toast({ description: "Editing messages is not yet implemented." })}
                                                aria-label="Edit message"
                                            >
                                                <Edit size={16} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-7 w-7 text-gray-400 hover:text-white"
                                                onClick={() => handleCopy(message.content)}
                                                aria-label="Copy message"
                                            >
                                                <Copy size={16} />
                                            </Button>
                                        </div>
                                        <div className="rounded-lg px-4 py-3 max-w-[80%] bg-primary text-primary-foreground">
                                            {message.filePreview && (
                                                <Image src={message.filePreview} alt="attachment" width={200} height={200} className="rounded-md mb-2" />
                                            )}
                                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                        </div>
                                        <Avatar className="h-8 w-8 flex-shrink-0">
                                            <AvatarFallback className="text-sm bg-blue-600 text-white border-none">{(user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U').toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                    </div>
                                );
                            })}
                        </div>
                    </ScrollArea>
                )}
            </div>

            <div className="p-4 max-w-3xl w-full mx-auto">
                <form onSubmit={handleSendMessage}>
                     <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        className="hidden"
                        accept="image/*,application/pdf"
                    />
                    <div className="rounded-lg border border-gray-700 bg-black overflow-hidden">
                        {filePreview && attachedFile && (
                            <div className="p-4 bg-black border-b border-gray-700">
                                <div className="relative flex items-center gap-4 bg-[#2C2D30] p-3 rounded-lg w-full">
                                    {attachedFile.type.startsWith('image/') ? (
                                        <Image src={filePreview} alt="File preview" width={48} height={48} className="object-cover rounded-md h-12 w-12 flex-shrink-0" />
                                    ) : (
                                        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted flex-shrink-0">
                                            <FileText size={24} className="text-muted-foreground" />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-white truncate">{attachedFile.name}</p>

                                        <p className="text-xs text-gray-400">{Math.round(attachedFile.size / 1024)} KB</p>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7 rounded-full bg-black/70 text-white hover:bg-black flex-shrink-0"
                                        onClick={() => {
                                            setFilePreview(null);
                                            setAttachedFile(null);
                                        }}
                                    >
                                        <X size={16} />
                                    </Button>
                                </div>
                            </div>
                        )}
                        <div className="relative bg-[#2C2D30]">
                            <Textarea
                                ref={chatInputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Message Xeref..."
                                className="bg-transparent border-none rounded-lg resize-none p-4 text-sm w-full min-h-[60px] pr-28 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-transparent"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                            />
                             <div className="absolute bottom-4 right-4 flex items-center space-x-2">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className={cn(
                                                    "h-8 w-8 text-gray-400 hover:text-white",
                                                    isListening && "text-red-500 animate-pulse"
                                                )}
                                                onClick={handleToggleListening}
                                            >
                                                <AudioLines size={18} />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Use your voice to chat</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <Button
                                    type="submit"
                                    size="icon"
                                    disabled={isSendDisabled}
                                    className={cn(
                                        "group h-8 w-8 rounded-full",
                                        isSendDisabled
                                            ? "bg-muted text-muted-foreground cursor-not-allowed"
                                            : "bg-white hover:bg-gray-200 text-black"
                                    )}
                                >
                                    {isLoading ? (
                                        <Loader2 className="animate-spin" size={16} />
                                    ) : (
                                        <>
                                            <ArrowUp
                                                size={16}
                                                className={cn(isSendDisabled && "group-hover:hidden")}
                                            />
                                            {isSendDisabled && (
                                                <Ban
                                                    size={16}
                                                    className="text-red-500 hidden group-hover:block"
                                                />
                                            )}
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                         <div className="bg-black flex items-center justify-between px-3 py-2">
                            <div className="flex items-center space-x-2">
                                <ModelsDialog
                                    value={settings.model}
                                    onValueChange={(model) => setSettings({ ...settings, model })}
                                    user={user}
                                />
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        const newMode = chatMode === 'agent' ? 'chat' : 'agent';
                                        setChatMode(newMode);
                                        toast({
                                            title: 'Mode Switched',
                                            description: `Switched to ${newMode === 'agent' ? 'Agent' : 'Chat'} mode.`,
                                        });
                                    }}
                                    className={cn(
                                        "h-9 capitalize transition-all",
                                        chatMode === 'agent'
                                            ? "rounded-full px-4 font-semibold bg-[#2b253b] border border-purple-600/70 text-purple-300 hover:bg-[#3a324c]"
                                            : "rounded-lg bg-[#2C2F47] text-[#A5B3E3] hover:bg-[#393d59]"
                                    )}
                                >
                                    {chatMode === 'agent' ? <LogoSvg className="h-4 w-4 mr-2" /> : <MessageSquare size={16} className="mr-2" />}
                                    {chatMode}
                                </Button>
                            </div>
                            <div className="flex items-center space-x-1">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => {
                                                    const newMode = chatMode === 'ultra-search' ? 'chat' : 'ultra-search';
                                                    setChatMode(newMode);
                                                }}
                                                className={cn(
                                                    "h-8 w-8 text-gray-400 hover:text-white",
                                                    chatMode === 'ultra-search' && "bg-primary/20 text-primary"
                                                )}
                                            >
                                                <Search size={18} />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Ultra Search</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white" onClick={() => fileInputRef.current?.click()}>
                                    <Paperclip size={18} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="mt-4 flex items-center justify-between text-sm min-h-[36px]">
                    {isLoading ? (
                        <div className="w-full flex items-center justify-center space-x-3">
                            <Button variant="outline" className="bg-[#2C2D30] border-gray-700 text-gray-300 pointer-events-none">
                                <SparkleIcon className="h-4 w-4 mr-2" />
                                Xeref.ai is thinking...
                            </Button>
                        </div>
                    ) : (
                       null
                    )}
                </div>
            </div>
        </main>
    );
};
