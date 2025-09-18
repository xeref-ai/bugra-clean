
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { X, Info, Trash2, Wand2 } from 'lucide-react';

const colors = [
  '#3b82f6', '#ef4444', '#22c55e', '#a855f7', '#f97316', '#eab308',
  '#ec4899', '#14b8a6', '#6366f1', '#84cc16', '#0ea5e9', '#d946ef',
  '#6b7280', '#f59e0b', '#8b5cf6', '#ef4444'
];

export const EditProjectView = ({ onClose }: { onClose: () => void }) => {
  const [selectedColor, setSelectedColor] = React.useState(colors[3]);
  const [excludeContext, setExcludeContext] = React.useState(false);
  const [description, setDescription] = React.useState('Massage Xeref...');
  const isDescriptionValid = description.length >= 20;

  return (
    <div className="bg-[#1e2024] text-gray-300 flex-shrink-0 flex flex-col border-l border-gray-700 p-6 h-full w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Edit Project</h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white h-8 w-8">
          <X size={20} />
        </Button>
      </div>

      <ScrollArea className="flex-1 -mx-6">
        <div className="px-6 space-y-6">
          <div>
            <Label htmlFor="project-name" className="text-sm font-medium text-gray-400">Project Name</Label>
            <Input id="project-name" defaultValue="xeref.ai" className="bg-[#2C2D30] border-gray-700 mt-2 text-white" />
          </div>

          <div>
            <Label htmlFor="project-description" className="text-sm font-medium text-gray-400">Description (optional)</Label>
            <div className="relative">
                <Input 
                    id="project-description" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-[#2C2D30] border-gray-700 mt-2 text-white" 
                />
                 {!isDescriptionValid && (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-red-500">
                                    {description.length}/20
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Description must be at least 20 characters</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
            </div>
          </div>

          <div>
            <Label htmlFor="project-context" className="text-sm font-medium text-gray-400">Context (optional)</Label>
            <div className="relative">
                <Textarea id="project-context" defaultValue="@BugraKarsli" className="bg-[#2C2D30] border-gray-700 mt-2 h-36 text-white" />
                <Button 
                    variant="outline" 
                    size="sm"
                    className="absolute bottom-3 right-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-none"
                    disabled={!isDescriptionValid}
                >
                    <Wand2 size={14} className="mr-2" />
                    Generate System Prompt
                </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Label htmlFor="exclude-context" className="text-sm text-gray-400">Exclude user context</Label>
                 <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Info size={14} className="text-gray-500" />
                        </TooltipTrigger>
                        <TooltipContent side="top">
                            <p>If enabled, your global user context will be ignored.</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <Switch id="exclude-context" checked={excludeContext} onCheckedChange={setExcludeContext} />
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-400">Color</Label>
            <div className="flex flex-wrap gap-3 mt-2">
              {colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`h-6 w-6 rounded-full focus:outline-none ring-2 ring-offset-2 ring-offset-[#1e2024] ${selectedColor === color ? 'ring-white' : 'ring-transparent'}`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="mt-auto pt-6 border-t border-gray-800 flex justify-between items-center">
        <Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-white font-semibold">
          <Trash2 size={16} className="mr-2"/>
          Delete
        </Button>
        <Button className="bg-gray-300 hover:bg-white text-black font-semibold">
          Save Changes
        </Button>
      </div>
    </div>
  );
};
