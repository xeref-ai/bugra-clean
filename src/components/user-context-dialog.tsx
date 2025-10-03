
'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/lib/auth';
import { getUserContext } from '@/lib/firestore';

interface UserContextDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (context: string) => void;
}

export const UserContextDialog: React.FC<UserContextDialogProps> = ({ open, onOpenChange, onSave }) => {
  const { user } = useAuth();
  const [context, setContext] = useState('');

  useEffect(() => {
    if (user && open) {
      getUserContext(user.uid).then(userContext => {
        if (userContext && typeof userContext.context === 'string') {
          setContext(userContext.context);
        } else {
          setContext('');
        }
      });
    }
  }, [user, open]);

  const handleSave = () => {
    onSave(context);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Context</DialogTitle>
          <DialogDescription>
            Provide some context about yourself to personalize the AI's responses.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder="e.g., I am a software engineer working on a new project..."
          value={context}
          onChange={(e) => setContext(e.target.value)}
          rows={6}
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
