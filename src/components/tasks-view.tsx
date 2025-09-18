
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from '@/components/ui/badge';
import { useToast } from "@/hooks/use-toast";
import { type Task, TaskStatus } from '@/lib/types';
import { Archive, MoreHorizontal, User, Clock, ListFilter, Plus, ChevronDown, Calendar, KanbanSquare, X, Sparkles, Loader2 } from 'lucide-react';
import { changelogData } from '@/lib/changelog-data';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from "@/components/ui/skeleton";
import { TaskCleanupDialog } from './task-cleanup-dialog';

const TasksViewHeader = ({ 
    onMoreClick, 
    onUserClick, 
    onOpenGuestProfile,
    activeTasks 
}: { 
    onMoreClick: () => void, 
    onUserClick: () => void, 
    onOpenGuestProfile: () => void,
    activeTasks: Task[] 
}) => {
    const overdueTasks = activeTasks.filter(task => task.dueDate && new Date(task.dueDate) < new Date()).length;
    const totalActiveTasks = activeTasks.length;

    return (
        <div className="bg-white text-black p-4 flex justify-between items-center rounded-t-lg flex-shrink-0">
            <div className="flex items-center space-x-2">
                <h1 className="font-bold text-xl">xeref.ai<span className="text-primary">+</span></h1>
            </div>
            <div className="flex items-center space-x-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-black h-8 w-8">
                                <MoreHorizontal />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>More Options</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                             <Button variant="ghost" size="icon" className="text-gray-500 hover:text-black h-8 w-8" onClick={onOpenGuestProfile}>
                                <User />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>User Context</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                 <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" className="flex items-center space-x-2 rounded-full border-gray-300">
                                <Clock className="h-4 w-4 text-gray-500" />
                                <span className="font-semibold">{overdueTasks}</span>
                                <span className="text-gray-400">/</span>
                                <span className="text-gray-400">{totalActiveTasks}</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{overdueTasks} tasks due today or overdue</p>
                            <p>{totalActiveTasks} total active tasks</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    );
};

const KanbanColumn = ({ title, count, children }: { title: string, count: number, children: React.ReactNode }) => {
    return (
        <div className="flex flex-col w-64 flex-shrink-0">
            <div className="flex items-center justify-between px-3 py-2">
                <h3 className="font-semibold text-sm">{title}</h3>
                <span className="text-sm text-muted-foreground">{count}</span>
            </div>
            <div className="flex-grow bg-[#2C2D30] rounded-md p-2 space-y-2">
                {children}
                <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground hover:text-foreground">
                    <Plus size={16} className="mr-2" />
                    Add Task
                </Button>
            </div>
        </div>
    );
};

const TaskSkeleton = () => (
    <div className="flex items-center p-3 bg-[#2C2D30] rounded-md">
        <Skeleton className="h-5 w-5 mr-3" />
        <Skeleton className="h-4 w-3/4" />
    </div>
)


export const TasksView = ({
    activeTasks = [],
    toggleTaskCompletion,
    archiveTask,
    onViewArchived,
    onClose,
    onOpenGuestProfile,
    isLoading
}: {
    activeTasks: Task[];
    toggleTaskCompletion: (id: string, status: TaskStatus) => void;
    archiveTask: (id: string) => void;
    onViewArchived: () => void;
    onClose: () => void;
    onOpenGuestProfile: () => void;
    isLoading: boolean;
}) => {
    const { toast } = useToast();
    const [viewMode, setViewMode] = useState<'list' | 'calendar' | 'kanban'>('kanban');
    const [isCleanupLoading, setIsCleanupLoading] = useState(false);
    const [isCleanupDialogOpen, setIsCleanupDialogOpen] = useState(false);

    const handleCleanupClick = () => {
        setIsCleanupLoading(true);
        setTimeout(() => {
            setIsCleanupLoading(false);
            setIsCleanupDialogOpen(true);
        }, 2000);
    };

    const handleAcceptCleanup = (selectedActions: string[]) => {
        toast({
            title: "Tasks Cleaned Up!",
            description: `Accepted ${selectedActions.length} suggestions.`,
        });
    };

    return (
        <div className="bg-[#1e2024] text-gray-300 flex flex-col h-full w-full rounded-lg shadow-2xl overflow-hidden border border-border">
            <TasksViewHeader 
                onMoreClick={onViewArchived} 
                onUserClick={() => toast({ description: "User profile coming soon!"})} 
                onOpenGuestProfile={onOpenGuestProfile}
                activeTasks={activeTasks} 
            />
            
            <div className="p-6 flex-grow flex flex-col min-h-0">
                <div className="flex justify-between items-center mb-6 flex-shrink-0">
                  <div className="text-sm text-muted-foreground">
                    <span className="hover:text-foreground cursor-pointer">personal</span>
                    <span> / </span>
                    <span className="text-foreground font-medium">all tasks</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
                          <ListFilter className="h-4 w-4" />
                          <span className="capitalize">{viewMode}</span>
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-border text-foreground">
                        <DropdownMenuItem onSelect={() => setViewMode('list')}>
                          <ListFilter className="mr-2 h-4 w-4" />
                          <span>List</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setViewMode('calendar')}>
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>Calendar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setViewMode('kanban')}>
                          <KanbanSquare className="mr-2 h-4 w-4" />
                          <span>Kanban</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                           <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 bg-gradient-to-br from-purple-500 to-indigo-600 text-white hover:opacity-90"
                                onClick={handleCleanupClick}
                                disabled={isCleanupLoading}
                            >
                                {isCleanupLoading ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    <Sparkles size={16} />
                                )}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>AI Cleanup</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                {isCleanupLoading && (
                    <div className="flex-grow flex flex-col items-center justify-center text-center">
                        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-3 rounded-full animate-pulse">
                            <Sparkles className="h-8 w-8 text-white" />
                        </div>
                        <p className="mt-4 text-lg font-semibold">Analyzing your tasks...</p>
                    </div>
                )}

                {!isCleanupLoading && isLoading ? (
                    <div className="space-y-2">
                        <TaskSkeleton />
                        <TaskSkeleton />
                        <TaskSkeleton />
                    </div>
                ) : !isCleanupLoading && viewMode === 'list' && (
                  activeTasks.length > 0 ? (
                      <ScrollArea className="flex-1 -mx-6">
                          <div className="px-6 space-y-2">
                              {activeTasks.map(task => (
                                  <div key={task.id} className="flex items-center p-3 bg-[#2C2D30] rounded-md group">
                                      <Checkbox
                                          id={`task-${task.id}`}
                                          checked={task.status === 'done'}
                                          onCheckedChange={() => toggleTaskCompletion(task.id, task.status)}
                                          className="mr-3 h-5 w-5 border-gray-600 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                      />
                                      <label htmlFor={`task-${task.id}`} className="flex-grow text-sm cursor-pointer">{task.title}</label>

                                      <Badge className={cn('ml-2 text-xs font-normal h-6 border-none', task.priority.toLowerCase())}>
                                        {task.priority}
                                      </Badge>
                                       <Button variant="ghost" size="icon" className="h-7 w-7 ml-1 text-gray-500 opacity-0 group-hover:opacity-100 hover:text-primary" onClick={() => archiveTask(task.id)}>
                                          <Archive size={16} />
                                       </Button>
                                  </div>
                              ))}
                          </div>
                      </ScrollArea>
                  ) : (
                      <div className="flex-grow flex flex-col items-center justify-center text-center">
                          <h3 className="text-lg font-semibold text-white">No tasks yet</h3>
                          <p className="text-muted-foreground mt-1">Create your first task to get started</p>
                          <Button 
                              onClick={() => toast({ description: "Please add tasks via chat for automatic difficulty ranking." })}
                              className="mt-4 bg-white text-black hover:bg-gray-200"
                          >
                              <Plus size={16} className="mr-2" />
                              Add Task
                          </Button>
                      </div>
                  )
                )}

                {!isCleanupLoading && viewMode === 'calendar' && (
                    <div className="flex-grow flex flex-col items-center justify-center text-center text-muted-foreground">
                        <Calendar className="h-16 w-16 mb-4" />
                        <h3 className="text-lg font-semibold text-foreground">Calendar View</h3>
                        <p>This feature is coming soon!</p>
                    </div>
                )}

                {!isCleanupLoading && viewMode === 'kanban' && (
                    <div className="flex-grow flex space-x-4 overflow-x-auto pb-4">
                        <KanbanColumn title="To Do" count={activeTasks.filter(t => t.status === 'todo').length}>
                            {activeTasks.filter(t => t.status === 'todo').map(task => (
                                <div key={task.id} className="p-3 bg-[#1A1D21] rounded-md text-sm">{task.title}</div>
                            ))}
                        </KanbanColumn>
                        <KanbanColumn title="In Progress" count={0}>
                            <div className="p-3 bg-[#1A1D21] rounded-md text-sm text-muted-foreground">Drop tasks here</div>
                        </KanbanColumn>
                        <KanbanColumn title="Testing" count={0}>
                             <div className="p-3 bg-[#1A1D21] rounded-md text-sm text-muted-foreground">Drop tasks here</div>
                        </KanbanColumn>
                        <KanbanColumn title="Completed" count={17}>
                             <div className="p-3 bg-[#1A1D21] rounded-md text-sm text-muted-foreground">Drop tasks here</div>
                        </KanbanColumn>
                    </div>
                )}
            </div>

          <div className="mt-auto flex-shrink-0 p-4 pt-2">
              <div className="border-t border-gray-800 mt-2 pt-4 text-center">
                <p className="text-xs text-gray-500 mt-1">
                  <Link href="/changelog" className="hover:underline">
                    {changelogData.latestVersion}
                  </Link>
                </p>
              </div>
          </div>
          <TaskCleanupDialog 
            open={isCleanupDialogOpen} 
            onOpenChange={setIsCleanupDialogOpen}
            onAccept={handleAcceptCleanup}
          />
        </div>
    );
};
