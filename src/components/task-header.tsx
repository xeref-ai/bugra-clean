import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ListFilter } from 'lucide-react';

export const TaskHeader = ({ activeTasksCount }: { activeTasksCount: number }) => {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="text-sm text-muted-foreground">
        <span className="hover:text-foreground cursor-pointer">xeref</span>
        <span> / </span>
        <span className="text-foreground font-medium">all tasks</span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
            <ListFilter className="h-4 w-4" />
            <span>display</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-card border-border text-foreground">
          <DropdownMenuItem>List</DropdownMenuItem>
          <DropdownMenuItem>Calendar</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
