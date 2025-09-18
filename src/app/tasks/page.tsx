
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Calendar as CalendarIcon, ListFilter, ChevronLeft, ChevronRight, Circle, Kanban, GripVertical } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { TaskHeader } from '@/components/task-header';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from 'date-fns';
import { changelogData } from '@/lib/changelog-data';
import { featureFlags } from '@/lib/feature-flags';

// Enhanced Task interface
interface Task {
  id: string;
  title: string;
  completed: boolean;
  overdue: boolean;
  dueDate?: Date;
  status: 'todo' | 'inprogress' | 'done';
}

const initialTasks: Task[] = [
  { id: '1', title: 'How to implement chat and agent mode step-by-step', completed: false, overdue: true, dueDate: new Date('2025-06-27T10:00:00Z'), status: 'inprogress' },
  { id: '2', title: 'Draft core features for AI Agent', completed: false, overdue: false, dueDate: new Date('2025-06-10T10:00:00Z'), status: 'todo' },
  { id: '3', title: 'Post job ad for new employee', completed: true, overdue: false, dueDate: new Date('2025-06-05T10:00:00Z'), status: 'done' },
  { id: '4', title: 'Daily dashboard user feedback check', completed: false, overdue: false, dueDate: new Date('2025-07-01T10:00:00Z'), status: 'todo' },
];

const years = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() + 5 - i).toString());
const months = Array.from({ length: 12 }, (_, i) => ({ value: i, label: format(new Date(0, i), 'MMMM') }));

const CalendarView = ({ tasks }: { tasks: Task[] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const startDate = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 }); // Monday
  const endDate = endOfWeek(lastDayOfMonth, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const tasksByDate = tasks.reduce((acc, task) => {
    if (task.dueDate) {
      const dateKey = format(task.dueDate, 'yyyy-MM-dd');
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(task);
    }
    return acc;
  }, {} as Record<string, Task[]>);

  return (
    <div className="mt-6">
      <div className="flex items-center space-x-4 mb-4">
        <Select
          value={currentDate.getMonth().toString()}
          onValueChange={(value) => setCurrentDate(new Date(currentDate.getFullYear(), parseInt(value), 1))}
        >
          <SelectTrigger className="w-32 bg-card border-border focus:ring-primary">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            {months.map(month => (
              <SelectItem key={month.value} value={month.value.toString()}>{month.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={currentDate.getFullYear().toString()}
          onValueChange={(value) => setCurrentDate(new Date(parseInt(value), currentDate.getMonth(), 1))}
        >
          <SelectTrigger className="w-28 bg-card border-border focus:ring-primary">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {years.map(year => (
              <SelectItem key={year} value={year}>{year}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" className="bg-card border-border">Week</Button>
        <div className="flex-grow"></div>
        <Button variant="ghost" size="icon" onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid grid-cols-7 border-t border-l border-border">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
          <div key={day} className="text-center py-2 text-xs font-medium text-muted-foreground border-b border-r border-border">
            {day}
          </div>
        ))}
        {days.map(day => {
          const dateKey = format(day, 'yyyy-MM-dd');
          const dayTasks = tasksByDate[dateKey] || [];
          return (
            <div
              key={day.toString()}
              className={cn(
                "h-32 border-b border-r border-border p-2 flex flex-col relative",
                !isSameMonth(day, currentDate) && "bg-black/20"
              )}
            >
              <span
                className={cn(
                  "font-medium text-sm",
                  !isSameMonth(day, currentDate) && "text-muted-foreground/50",
                  isSameDay(day, new Date()) && "bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center"
                )}
              >
                {format(day, 'd')}
              </span>
              <div className="mt-1 space-y-1 overflow-y-auto">
                {dayTasks.map(task => (
                  <div key={task.id} className="flex items-center space-x-1.5 text-xs">
                    <Circle className="h-2 w-2 text-blue-400 fill-current" />
                    <span className="truncate">{task.title}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ListView = ({ tasks, toggleTask }: { tasks: Task[], toggleTask: (id: string) => void }) => {
  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <>
      <div className="space-y-0 mt-6">
        {activeTasks.length > 0 ? activeTasks.map((task, index) => (
          <React.Fragment key={task.id}>
            <div className="flex items-start py-4">
              <Checkbox
                id={`task-${task.id}`}
                className="rounded-full h-5 w-5 mr-4 mt-0.5 border-2 border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
              />
              <div className="flex-grow">
                <label htmlFor={`task-${task.id}`} className="text-base text-foreground cursor-pointer">{task.title}</label>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground mt-2">
                    {task.overdue && (
                         <div className="flex items-center space-x-1.5 text-red-500">
                            <CalendarIcon className="h-4 w-4" />
                            <span>overdue</span>
                        </div>
                    )}
                     {task.dueDate && !task.overdue && (
                        <div className="flex items-center space-x-1.5">
                            <CalendarIcon className="h-4 w-4" />
                            <span>{isSameDay(task.dueDate, new Date()) ? 'today' : format(task.dueDate, 'MMM d')}</span>
                        </div>
                    )}
                </div>
              </div>
            </div>
            {index < activeTasks.length - 1 && <Separator className="bg-border/50" />}
          </React.Fragment>
        )) : (
            <div className="text-center py-10 text-muted-foreground">
                <p>No tasks yet</p>
                <Button className="mt-4">Add Task</Button>
            </div>
        )}
      </div>

      {completedTasks.length > 0 && (
        <div className="mt-6 text-center">
            <Button variant="link" className="text-muted-foreground text-sm">
            completed tasks
            </Button>
        </div>
      )}
    </>
  );
};

const KanbanView = ({ tasks }: { tasks: Task[] }) => {
    const columns = [
        { id: 'todo', title: 'To Do', tasks: tasks.filter(t => t.status === 'todo')},
        { id: 'inprogress', title: 'In Progress', tasks: tasks.filter(t => t.status === 'inprogress')},
        { id: 'done', title: 'Done', tasks: tasks.filter(t => t.status === 'done')}
    ];

    return (
        <div className="mt-6 grid grid-cols-3 gap-6">
            {columns.map(column => (
                <div key={column.id} className="bg-black/20 rounded-lg p-4">
                    <h3 className="font-bold text-lg mb-4">{column.title}</h3>
                    <div className="space-y-4">
                        {column.tasks.map(task => (
                            <div key={task.id} className="bg-card p-4 rounded-md shadow flex items-center">
                                <GripVertical className="h-5 w-5 text-muted-foreground mr-2 cursor-grab"/>
                                <span>{task.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};


const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [viewMode, setViewMode] = useState<'list' | 'calendar' | 'kanban'>('list');

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const activeTasks = tasks.filter(task => !task.completed);

  return (
      <div className={cn(
          "w-full bg-card rounded-xl shadow-2xl overflow-hidden border border-border flex flex-col h-full",
          viewMode === 'list' ? 'max-w-2xl' : 'max-w-7xl'
        )}>
        <div className="flex-grow">
          <TaskHeader activeTasksCount={activeTasks.length} />

          <main className="p-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium">Xeref</span>
                <span className="mx-2"> / </span>
                <span className="text-foreground font-medium">today's tasks</span>
                 {featureFlags.tasks.todayFocus && <Button variant="ghost" size="sm" className="ml-4">Today Focus</Button>}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
                    <ListFilter className="h-4 w-4" />
                    <span>display</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card border-border text-foreground">
                  <DropdownMenuItem onSelect={() => setViewMode('list')}>List</DropdownMenuItem>
                  {featureFlags.tasks.calendarView && <DropdownMenuItem onSelect={() => setViewMode('calendar')}>Calendar</DropdownMenuItem>}
                  {featureFlags.tasks.kanbanView && <DropdownMenuItem onSelect={() => setViewMode('kanban')}>
                      <Kanban className="h-4 w-4 mr-2"/>
                      Kanban
                  </DropdownMenuItem>}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {viewMode === 'list' && <ListView tasks={tasks} toggleTask={toggleTask} />}
            {viewMode === 'calendar' && <CalendarView tasks={tasks} />}
            {viewMode === 'kanban' && <KanbanView tasks={tasks} />}
            
          </main>
        </div>
        <footer className="p-4 border-t border-border text-center text-xs text-muted-foreground">
          <Link href="/changelog" className="hover:underline">
            {changelogData.latestVersion}
          </Link>
        </footer>
      </div>
  );
};

export default TasksPage;
