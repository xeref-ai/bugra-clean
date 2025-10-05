
'use client';

import React, 'react';
import {
  ChevronsLeft,
  ChevronsRight,
  Plus,
  Search,
  Inbox,
  Star,
  Settings,
  MoreHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@/lib/utils';
import { LogoSvg } from './icons';

export const IconSidebar = () => {
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <div
      className={cn(
        'h-full bg-[#1A1D21] text-gray-300 flex flex-col transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="p-2 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <LogoSvg className="h-8 w-8" />
            <span className="font-semibold">xeref.ai</span>
          </div>
        )}
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          {isCollapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 space-y-1">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Search size={18} />
          {!isCollapsed && 'Search'}
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Inbox size={18} />
          {!isCollapsed && 'Inbox'}
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Star size={18} />
          {!isCollapsed && 'Favorites'}
        </Button>
      </nav>

      {/* Projects */}
      {!isCollapsed && (
        <div className="px-3 py-2">
          <h3 className="text-xs font-semibold uppercase text-gray-500">Projects</h3>
        </div>
      )}
      <div className="flex-1 px-2 space-y-1">
        <Button variant="secondary" className="w-full justify-start gap-2">
          <LogoSvg className="h-4 w-4" />
          {!isCollapsed && 'xeref.ai'}
        </Button>
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-gray-800">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="text-left">
                  <p className="text-sm font-medium">User</p>
                  <p className="text-xs text-gray-500">Rated Free</p>
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
