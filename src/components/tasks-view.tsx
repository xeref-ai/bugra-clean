
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from '@/components/ui/badge';
import { useToast } from "@/hooks/use-toast";
import { type Task, TaskStatus } from '@/lib/types';
import { getTasks, updateTask } from '@/lib/task';
import { Archive, MoreHorizontal, User, Clock, ListFilter, Plus, ChevronDown } from 'lucide-react';
import { changelogData } from '@/lib/changelog-data';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

const TasksViewHeader = ({ dueTasksCount }: { dueTasksCount: number }) => {
    return (
        <div className="bg-white text-black p-4 flex justify-between items-center rounded-t-lg flex-shrink-0">
            <div className="flex items-center space-x-2">
                <h1 className="font-bold text-xl">xeref.ai<span className="text-primary">+</span></h1>
            </div>
            <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="text-gray-500 hover:text-black h-8 w-8">
                    <User />
                </Button>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" className="flex items-center space-x-2 border-gray-300 h-8 px-3 text-black bg-white hover:bg-gray-100">
                          <Clock size={16} />
                          <span>{dueTasksCount}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{dueTasksCount > 0 ? `${dueTasksCount} tasks due` : 'No Tasks due today or overdue'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button variant="ghost" size="icon" className="text-gray-500 hover:text-black h-8 w-8">
                    <MoreHorizontal />
                </Button>
            </div>
        </div>
    );
};


export const TasksView = ({
    userId,
    onViewArchived,
    onClose
}: {
    userId: string;
    onViewArchived: () => void;
    onClose: () => void;
}) => {
    const { toast } = useToast();
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const fetchedTasks = await getTasks(userId);
            setTasks(fetchedTasks);
        };
        fetchTasks();
    }, [userId]);

    const toggleTaskCompletion = async (id: string, currentStatus: TaskStatus) => {
        const newStatus = currentStatus === 'done' ? 'todo' : 'done';
        const updatedTask = await updateTask(id, { status: newStatus });
        setTasks(tasks.map(t => t.id === id ? updatedTask : t));
    };

    const archiveTask = async (id: string) => {
        const updatedTask = await updateTask(id, { status: 'archived' });
        setTasks(tasks.map(t => t.id === id ? updatedTask : t));
    };

    const activeTasks = tasks.filter(t => t.status !== 'archived');
    const dueTasksCount = activeTasks.filter(t => t.due_date && new Date(t.due_date) <= new Date()).length;

    return (
        <div className="bg-[#1e2024] text-gray-300 flex flex-col h-full w-full rounded-lg shadow-2xl overflow-hidden border border-border">
            <TasksViewHeader dueTasksCount={dueTasksCount} />
            
            <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-sm text-muted-foreground">
                    <span className="hover:text-foreground cursor-pointer">xeref</span>
                    <span> / </span>
                    <span className="text-foreground font-medium">today's tasks</span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
                        <ListFilter className="h-4 w-4" />
                        <span>display</span>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-card border-border text-foreground">
                      <DropdownMenuItem>List</DropdownMenuItem>
                      <DropdownMenuItem>Calendar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {activeTasks.length > 0 ? (
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
                )}
            </div>

          <div className="mt-auto flex-shrink-0 p-4 pt-2">
              <div className="text-center">
                <Button variant="link" className="text-muted-foreground text-sm" onClick={onViewArchived}>
                    completed tasks
                </Button>
              </div>
              <div className="border-t border-gray-800 mt-2 pt-4">
                  <p className="text-center text-xs text-gray-500">
                    <Link href="/changelog" className="hover:underline">
                      {changelogData.latestVersion}
                    </Link>
                  </p>
              </div>
          </div>
        </div>
    );
};
