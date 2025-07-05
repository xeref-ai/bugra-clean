
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  PenLine,
  CheckCheck,
  FileText,
  Search,
  ExternalLink,
  Info,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DiscordIcon } from '@/components/icons';
import { ShortcutsPanel } from '@/components/shortcuts-panel';
import { SearchView } from '@/components/search-view';

type RightView = 'tasks' | 'ideas' | 'notes' | 'settings' | 'archived';

export const RightNav = ({ activeView, setActiveRightView }: { activeView: RightView | null; setActiveRightView: (view: RightView | null) => void; }) => {
      const navItemsTop: {id: RightView, icon: React.ElementType, label: string}[] = [
          { id: 'ideas', icon: PenLine, label: 'Ideas' },
          { id: 'tasks', icon: CheckCheck, label: 'Tasks' },
          { id: 'notes', icon: FileText, label: 'Notes' },
      ];
      
       const navItemsBottom: {id: RightView, icon: React.ElementType, label: string}[] = [
       ];

      const renderNavItem = (item: typeof navItemsTop[number] | typeof navItemsBottom[number]) => (
        <TooltipProvider key={item.id}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                            "h-12 w-12 bg-[#2C2D30] hover:bg-gray-700/50 text-gray-400 hover:text-white rounded-lg",
                            activeView === item.id && "ring-2 ring-white"
                        )}
                        onClick={() => setActiveRightView(item.id)}
                    >
                        <item.icon size={24} />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                    <p>{item.label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
      );
  
      return (
          <aside className="w-20 bg-[#121016] flex-shrink-0 flex flex-col items-center py-4 border-l border-gray-800">
              <div className="flex flex-col items-center space-y-4">
                {navItemsTop.map(renderNavItem)}
                <Separator className="my-2 bg-gray-700 h-px w-8" />
                {navItemsBottom.map(renderNavItem)}
                <Dialog>
                    <TooltipProvider>
                        <Tooltip>
                        <TooltipTrigger asChild>
                            <DialogTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-12 w-12 bg-[#2C2D30] hover:bg-gray-700/50 text-gray-400 hover:text-white rounded-lg"
                            >
                                <Search size={24} />
                            </Button>
                            </DialogTrigger>
                        </TooltipTrigger>
                        <TooltipContent side="left"><p>Search</p></TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <DialogContent className="p-0 bg-transparent border-none shadow-none max-w-2xl rounded-lg overflow-hidden">
                        <SearchView />
                    </DialogContent>
                </Dialog>
              </div>
              <div className="mt-auto flex flex-col items-center space-y-4">
                <Dialog>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-12 w-12 bg-[#2C2D30] hover:bg-gray-700/50 text-gray-400 hover:text-white rounded-lg"
                                    >
                                        <ExternalLink size={24} />
                                    </Button>
                                </DialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent side="left">
                                <p>Shortcuts</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <DialogContent className="max-w-4xl bg-[#1e2024] border-gray-700 p-0">
                        <ShortcutsPanel />
                    </DialogContent>
                </Dialog>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-12 w-12 bg-[#2C2D30] hover:bg-gray-700/50 text-gray-400 hover:text-white rounded-lg"
                            >
                                <Info size={24} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                            <p>Watch the tutorial</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                             <Button asChild variant="ghost" size="icon" className="h-12 w-12 bg-[#2C2D30] hover:bg-gray-700/50 text-gray-400 hover:text-white rounded-lg">
                                <a href="https://discord.com" target="_blank" rel="noopener noreferrer" aria-label="Join our Discord">
                                    <DiscordIcon className="h-6 w-6" />
                                </a>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                            <p>Join our Discord</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
              </div>
          </aside>
      );
  };
