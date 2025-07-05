
"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
  import { Button } from "@/components/ui/button";
  import Link from "next/link";
  import { Cpu, ChevronRight, X, ArrowUp, ChevronsUpDown, Star } from "lucide-react";
  import * as React from 'react';
  import { cn } from "@/lib/utils";
  import { User } from 'firebase/auth';
  import { isUltraUser } from "@/lib/auth-utils";
  
  const models = [
    { name: "GPT 4.1", description: "Great for most tasks", hasStar: true, dotColor: 'bg-white' },
    { name: "DeepSeek: R1 0528", description: "Open-source reasoning model", dotColor: 'bg-blue-500' },
    { name: "Claude 4 Sonnet", description: "Creative and capable", pro: true, dotColor: 'bg-orange-400' },
    { name: "Claude 4 Sonnet Thinking", description: "Very creative reasoning model", pro: true, dotColor: 'bg-orange-400' },
    { name: "o4 mini", description: "Quick reasoning model", pro: true, dotColor: 'bg-white' },
    { name: "Gemini 2.5 Pro", description: "Super strong reasoning model", pro: true, dotColor: 'bg-green-500' },
    { name: "Grok 3", description: "Fair and unbiased", pro: true, dotColor: 'bg-yellow-400' },
    // Adding Gemini Flash here to ensure it's in the quick select list
    { name: "Gemini 2.5 Flash", description: "Fast reasoning model", dotColor: 'bg-green-500' },
  ];

  type ModelsDialogProps = {
    value: string;
    onValueChange: (value: string) => void;
    user: User | null;
  }
  
  export function ModelsDialog({ value, onValueChange, user }: ModelsDialogProps) {
    const [open, setOpen] = React.useState(false);
    const selectedModel = models.find(m => m.name === value) || models.find(m => m.name === 'Gemini 2.5 Flash'); // Default to Flash
    const isAdmin = isUltraUser(user);
  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center text-gray-400 hover:bg-gray-700/50 hover:text-gray-200">
               <span className={cn(
                  "h-2 w-2 rounded-full mr-2",
                  selectedModel?.dotColor
               )} />
               {selectedModel?.name}
               <ChevronsUpDown size={14} className="ml-1 opacity-50"/>
            </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md bg-[#18181B] border-zinc-800 text-white p-0">
          <DialogHeader className="p-4 border-b border-zinc-800 text-center">
            <DialogTitle className="text-white">Select Model</DialogTitle>
          </DialogHeader>
          <div className="p-2">
            {!isAdmin && (
                <Button asChild className="w-full bg-white text-black hover:bg-zinc-200 mb-1">
                  <Link href="/pricing">
                    <ArrowUp className="mr-2 h-4 w-4" />
                    UPGRADE TO PRO
                  </Link>
                </Button>
            )}
            {!isAdmin && (
                <p className="text-xs text-center text-zinc-400 mb-2">to unlock premium models</p>
            )}

            <div className="flex flex-col space-y-1">
              {models.filter(m => m.name !== 'Gemini 2.5 Flash' || value === 'Gemini 2.5 Flash').sort((a,b) => models.findIndex(m => m.name === a.name) - models.findIndex(m => m.name === b.name)).map((model) => {
                const isSelected = value === model.name;
                const isLocked = model.pro && !isAdmin;

                const modelItem = (
                    <div
                        key={model.name}
                        className={cn(
                            "flex items-center p-2 rounded-md",
                            !isLocked && "cursor-pointer",
                            isSelected && !isLocked ? "bg-zinc-700" : "hover:bg-zinc-800",
                            isLocked && "cursor-not-allowed opacity-60"
                        )}
                        onClick={() => {
                            if (!isLocked) {
                                onValueChange(model.name);
                                setOpen(false);
                            }
                        }}
                    >
                        <div className={cn(
                            "h-3 w-3 rounded-full mr-3 flex-shrink-0",
                            model.dotColor || 'bg-zinc-600'
                        )}></div>
                        <div className="flex-grow">
                        <p className="font-semibold flex items-center">
                          {model.name}
                          {model.hasStar && <Star className="h-4 w-4 ml-2 text-yellow-400 fill-yellow-400" />}
                        </p>
                        <p className="text-sm text-zinc-400">{model.description}</p>
                        </div>
                        {model.pro && !isAdmin && (
                            <span className="text-xs font-bold text-white bg-blue-600 px-2 py-0.5 rounded-md ml-2">PRO</span>
                        )}
                      
                    </div>
                );

                if (isLocked) {
                    return (
                        <TooltipProvider key={model.name} delayDuration={100}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    {modelItem}
                                </TooltipTrigger>
                                <TooltipContent side="bottom" className="bg-black text-white border-zinc-700">
                                <p>Upgrade to Pro to use</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )
                }
                
                return modelItem;

              })}
              <Link href="/models" className="flex items-center p-2 rounded-md hover:bg-zinc-800 cursor-pointer text-zinc-400 mt-1" onClick={() => setOpen(false)}>
                  <ChevronRight className="h-4 w-4 mr-2" />
                  More Models
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
