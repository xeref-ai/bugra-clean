
'use client';

import { TasksView } from '@/components/tasks-view';
import { useAuth } from '@/lib/auth';

const TasksPage = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return <TasksView userId={user.uid} onViewArchived={() => {}} onClose={() => {}} />;
};

export default TasksPage;
