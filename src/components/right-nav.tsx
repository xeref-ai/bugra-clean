
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
  MessageSquare,
  Plus,
  Send,
  Users,
  Slack,
  GitBranch,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DiscordIcon, LogoSvg } from '@/components/icons';
import { changelogData } from '@/lib/changelog-data';
import Link from 'next/link';
import { DocsSearch } from './docs-search';

type RightView = 'tasks' | 'ideas' | 'notes' | 'settings' | 'archived' | 'add-event' | 'team-builder' | 'workflow';

export const RightNav = ({ activeView, setActiveRightView, openFeedbackDialog, openAddEventDialog, openPostToSkoolDialog, openTeamBuilder, openSearchDialog }: { activeView: RightView | null; setActiveRightView: (view: RightView | null) => void; openFeedbackDialog: () => void; openAddEventDialog: () => void; openPostToSkoolDialog: () => void; openTeamBuilder: () => void; openSearchDialog: () => void; }) => {
      const navItemsTop: {id: RightView, icon: React.ElementType, label: string}[] = [
          { id: 'ideas', icon: PenLine, label: 'Ideas' },
          { id: 'notes', icon: FileText, label: 'Notes' },
          { id: 'workflow', icon: GitBranch, label: 'Workflow' },
          { id: 'tasks', icon: CheckCheck, label: 'Tasks' },
      ];
      
       const navItemsBottom: {id: RightView, icon: React.ElementType, label: string}[] = [
       ];

      const renderNavItem = (item: typeof navItemsTop[number] | typeof navItemsBottom[number]) => (
        <TooltipProvider key={item.id} delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                            "h-12 w-12 bg-[#2C2D30] hover:bg-gray-700/50 text-gray-400 hover:text-white rounded-lg",
                            activeView === item.id && "ring-2 ring-white"
                        )}
                        onClick={() => setActiveRightView(item.id === activeView ? null : item.id)}
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
                <TooltipProvider delayDuration={0}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-12 w-12 bg-[#2C2D30] hover:bg-gray-700/50 text-gray-400 hover:text-white rounded-lg"
                                onClick={openAddEventDialog}
                            >
                                <Plus size={24} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                            <p>Add Event</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <Separator className="my-2 bg-gray-700 h-px w-8" />
                {navItemsTop.map(renderNavItem)}
                <Separator className="my-2 bg-gray-700 h-px w-8" />
                {navItemsBottom.map(renderNavItem)}
                <TooltipProvider delayDuration={0}>
                    <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-12 w-12 bg-[#2C2D30] hover:bg-gray-700/50 text-gray-400 hover:text-white rounded-lg"
                            onClick={openSearchDialog}
                        >
                            <Search size={24} />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left"><p>Search</p></TooltipContent>
                    </Tooltip>
                </TooltipProvider>
              </div>
              <div className="mt-auto flex flex-col items-center space-y-4">
                <TooltipProvider delayDuration={0}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-12 w-12 bg-[#2C2D30] hover:bg-gray-700/50 text-gray-400 hover:text-white rounded-lg"
                                onClick={openPostToSkoolDialog}
                            >
                                <Send size={24} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                            <p>Post to Skool</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider delayDuration={0}>
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
                 <TooltipProvider delayDuration={0}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                             <Button asChild variant="ghost" size="icon" className="h-12 w-12 bg-[#2C2D30] hover:bg-gray-700/50 text-gray-400 hover:text-white rounded-lg">
                                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Join our Slack">
                                    <Slack className="h-6 w-6" />
                                </a>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                            <p>Join our Slack</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
              </div>
          </aside>
      );
  };
