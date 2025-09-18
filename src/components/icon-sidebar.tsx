
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Plus, Edit, PanelLeftClose, Home, MessageSquare, Search, BarChart, Crown } from 'lucide-react';
import { UserNav } from '@/components/user-nav';
import { LogoSvg } from '@/components/icons';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth';

interface IconSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  onNewProjectClick: () => void;
  onEditProjectClick: () => void;
}

export const IconSidebar: React.FC<IconSidebarProps> = ({ isCollapsed, onToggle, onNewProjectClick, onEditProjectClick }) => {
  const { isUltraUser } = useAuth();
  return (
    <aside className={cn(
        "bg-gray-900 text-white flex flex-col items-center py-4 transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
    )}>
      <div className="w-full px-4 mb-6">
         <Button 
            variant="ghost" 
            onClick={onToggle} 
            className="w-full h-12 justify-center hover:bg-gray-700/50 group"
        >
            <LogoSvg className="h-8 w-8 text-white group-hover:hidden" />
            <PanelLeftClose className="h-8 w-8 text-white hidden group-hover:block" />
        </Button>
      </div>
      <nav className="flex flex-col items-center space-y-4 w-full px-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/home">
                <Button variant="ghost" size="icon" className="h-12 w-12 hover:bg-gray-700/50">
                  <Home size={24} />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Home</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/chat">
                <Button variant="ghost" size="icon" className="h-12 w-12 hover:bg-gray-700/50">
                  <MessageSquare size={24} />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Chat</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-12 w-12 hover:bg-gray-700/50">
                <Search size={24} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Ultra-Search</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/performance">
                <Button variant="ghost" size="icon" className="h-12 w-12 hover:bg-gray-700/50">
                  <BarChart size={24} />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Analytics</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {isUltraUser && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-12 w-12 hover:bg-gray-700/50">
                <Crown size={24} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right">
              <DropdownMenuItem>PRO Feature 1</DropdownMenuItem>
              <DropdownMenuItem>PRO Feature 2</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </nav>
      <div className={cn("mt-auto w-full px-4 data-[collapsed=true]:px-0")} data-collapsed={isCollapsed}>
        <UserNav />
      </div>
    </aside>
  );
};
