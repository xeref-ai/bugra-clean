
'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface PostToSkoolDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PostToSkoolDialog: React.FC<PostToSkoolDialogProps> = ({ open, onOpenChange }) => {
  const [postContent, setPostContent] = useState('');
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const { toast } = useToast();

  const handlePost = async () => {
    setIsPosting(true);
    try {
      const response = await fetch('/api/skool/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: postContent }),
      });

      if (!response.ok) {
        throw new Error('Failed to post to Skool');
      }

      toast({ title: 'Success', description: 'Your post has been sent to Skool.' });
      setPostContent('');
      onOpenChange(false);
    } catch (error) {
      console.error('Skool post error:', error);
      toast({ title: 'Error', description: 'Failed to send post.', variant: 'destructive' });
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isPreviewing ? 'Preview Post' : 'Post to Skool'}</DialogTitle>
        </DialogHeader>
        
        {isPreviewing ? (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {postContent.split('\\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        ) : (
          <Textarea
            placeholder="What's on your mind?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            rows={6}
          />
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsPreviewing(!isPreviewing)}>
            {isPreviewing ? 'Edit' : 'Preview'}
          </Button>
          <Button onClick={handlePost} disabled={isPosting || !postContent.trim()}>
            {isPosting ? <Loader2 className="animate-spin" /> : 'Post'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
