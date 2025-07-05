'use client';

import React from 'react';
import {Button} from '@/components/ui/button';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';

interface ChatHeaderProps {
  handleResetChat: () => void;
}

export function ChatHeader({handleResetChat}: ChatHeaderProps) {
  return (
    <div className="border-b p-4 flex items-center justify-between">
      <h2 className="text-xl font-bold">Xeref.ai</h2>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          Upgrade to Pro
        </Button>
        <Button variant="ghost" size="sm" onClick={handleResetChat}>
          Reset Chat
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <Avatar>
                <AvatarImage src="https://picsum.photos/50/50" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

