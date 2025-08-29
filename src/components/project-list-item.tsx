
'use client';

import { useState } from 'react';
import { updateProject, deleteProject } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Edit, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ProjectListItem({ project }: { project: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(project.name);
  const { toast } = useToast();

  const handleUpdate = async () => {
    try {
      await updateProject(project.id, editedName);
      toast({ title: 'Project updated successfully!' });
      setIsEditing(false);
    } catch (error) {
      toast({ title: 'Failed to update project.', variant: 'destructive' });
    }
  };

  return (
    <li className="flex items-center justify-between p-2 border rounded">
      {isEditing ? (
        <Input
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          className="flex-grow"
        />
      ) : (
        <span>{project.name}</span>
      )}
      <div className="flex items-center gap-2 ml-2">
        {isEditing ? (
          <Button size="sm" onClick={handleUpdate}>
            <Save className="h-4 w-4" />
          </Button>
        ) : (
          <Button size="sm" onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4" />
          </Button>
        )}
        <form action={async () => await deleteProject(project.id)}>
          <Button size="sm" variant="destructive">
            <X className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </li>
  );
}
