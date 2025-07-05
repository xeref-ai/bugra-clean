
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Undo2, Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { type Task } from '@/lib/types';
import { format } from 'date-fns';

export const ArchivedTasksView = ({
  archivedTasks,
  unarchiveTask,
  deleteAllArchived,
  onClose,
}: {
  archivedTasks: Task[];
  unarchiveTask: (id: string) => void;
  deleteAllArchived: () => void;
  onClose: () => void;
}) => {
  const getFormattedDate = (completedAt: any): string => {
    if (!completedAt) {
      return '';
    }
    try {
      // Firestore Timestamps have a toDate() method
      if (typeof completedAt.toDate === 'function') {
        return format(completedAt.toDate(), 'dd/MM/yyyy');
      }
      // Handle cases where it might already be a Date object or string
      return format(new Date(completedAt), 'dd/MM/yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return ''; // Return empty string on error as per screenshot
    }
  };

  return (
    <div className="bg-[#1e2024] text-gray-300 flex-shrink-0 flex flex-col border-l border-gray-700 p-6 h-full w-full max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="bg-primary text-primary-foreground px-4 py-1.5 rounded-sm">
            <h2 className="text-lg font-semibold">Completed Tasks</h2>
        </div>
        <div className="flex items-center space-x-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" disabled={archivedTasks.length === 0}>
                  <Trash2 className="h-4 w-4 mr-2"/>
                  Delete All
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete all {archivedTasks.length} archived tasks.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={deleteAllArchived}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white h-8 w-8">
              <X size={20} />
            </Button>
        </div>
      </div>
      
      <div className="flex justify-between items-center px-2 py-2 text-xs text-muted-foreground uppercase font-semibold">
        <span>task name</span>
        <span>completion date</span>
      </div>
      
      <Separator className="bg-border/50 mb-2" />

      <ScrollArea className="flex-1 -mx-6">
        <div className="px-6">
          {archivedTasks.length > 0 ? (
            <ul className="space-y-0">
              {archivedTasks
                .filter(task => task.completedAt) // Only show tasks with a completion date
                .sort((a, b) => {
                    const dateA = a.completedAt?.toDate ? a.completedAt.toDate() : new Date(a.completedAt);
                    const dateB = b.completedAt?.toDate ? b.completedAt.toDate() : new Date(b.completedAt);
                    return dateB.getTime() - dateA.getTime();
                }) // Sort by most recent
                .map(task => (
                <li key={task.id} className="group flex items-center justify-between py-2.5 border-b border-border/30">
                  <div className="flex items-center space-x-3">
                    <Button variant="ghost" size="icon" onClick={() => unarchiveTask(task.id)} className="h-7 w-7 text-gray-500 hover:text-primary">
                        <Undo2 size={16} />
                    </Button>
                    <span className="text-sm">{task.title}</span>
                  </div>
                  <span className="text-sm text-muted-foreground font-mono">
                    {getFormattedDate(task.completedAt)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-gray-500 py-10">
              <p>No completed tasks.</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
