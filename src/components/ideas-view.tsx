
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { type Idea } from '@/lib/types';
import { X, ArrowUp, Plus, Trash2, Sparkles } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const IdeasView = ({
  onClose,
  ideas,
  addIdea,
  deleteIdea,
}: {
  onClose: () => void;
  ideas: Idea[];
  addIdea: (text: string) => void;
  deleteIdea: (id: string) => void;
}) => {
  const [newIdea, setNewIdea] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(true);
  const { toast } = useToast();
  const ideaInputRef = useRef<HTMLInputElement>(null);

  const handleAddIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIdea.trim()) return;
    addIdea(newIdea);
    setNewIdea('');
  };

  const handleAiCleanup = () => {
    if (ideas.length < 2) {
      toast({
        description: "AI cleanup needs at least 2 ideas to work",
      });
    } else {
      // Placeholder for future implementation
      toast({
        title: "Coming Soon!",
        description: "The AI cleanup feature is not yet implemented.",
      });
    }
  };

  return (
    <div className="bg-[#121016] text-gray-300 flex-shrink-0 flex flex-col border-l border-gray-800 p-6 h-full">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-white">Idea Inbox</h2>
            <Badge variant="secondary" className="bg-gray-700 text-gray-300">{ideas.length}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleAiCleanup} className="text-gray-400 hover:text-white h-8 w-8">
                  <Sparkles size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>AI cleanup</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {isAlertVisible && (
        <div className="text-sm text-gray-400 mb-4 flex justify-between items-center">
          <p>This is a place to quickly braindump ideas. Clear it out regularly.</p>
          <Button variant="ghost" size="icon" onClick={() => setIsAlertVisible(false)} className="h-6 w-6 text-gray-500 hover:text-white">
            <X size={16} />
          </Button>
        </div>
      )}

      <form onSubmit={handleAddIdea} className="relative mb-4">
        <Input
          ref={ideaInputRef}
          type="text"
          placeholder="Add a new idea..."
          value={newIdea}
          onChange={(e) => setNewIdea(e.target.value)}
          className="bg-[#2C2D30] border-gray-700 text-gray-300 placeholder:text-gray-500 rounded-lg p-3 pr-10"
        />
        <Button type="submit" size="icon" variant="ghost" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-white" disabled={!newIdea.trim()}>
          <ArrowUp size={20} />
        </Button>
      </form>

      <ScrollArea className="flex-1 -mx-6 border-t-2 border-dashed border-gray-800">
        <div className="px-6 py-4">
          {ideas.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              <h3 className="font-semibold text-white">Your idea inbox is empty</h3>
              <p className="text-sm mt-1">Add your first idea to get started</p>
              <Button onClick={() => ideaInputRef.current?.focus()} className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus size={16} className="mr-2" />
                Add Idea
              </Button>
            </div>
          ) : (
            <ul className="space-y-2">
              {ideas.map(idea => (
                <li key={idea.id} className="group flex items-center justify-between p-2 bg-[#1A1D21] rounded-md">
                  <span className="text-sm">{idea.text}</span>
                  <Button variant="ghost" size="icon" onClick={() => deleteIdea(idea.id)} className="h-7 w-7 text-gray-500 opacity-0 group-hover:opacity-100 hover:text-red-500">
                    <Trash2 size={16} />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
