
'use client';

import { useState } from 'react';
import { updateSource, resummarizeSource, deleteSource } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { X, Edit, Save, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function SourceListItem({ source }: { source: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [editedUrl, setEditedUrl] = useState(source.url);
  const [summary, setSummary] = useState(source.summary);
  const { toast } = useToast();

  const handleUpdate = async () => {
    try {
      await updateSource(source.id, { url: editedUrl });
      toast({ title: 'Source updated successfully!' });
      setIsEditing(false);
    } catch (error) {
      toast({ title: 'Failed to update source.', variant: 'destructive' });
    }
  };

  const handleResummarize = async () => {
    setIsSummarizing(true);
    try {
      const result = await resummarizeSource(source.id);
      setSummary(result.summary);
      toast({ title: 'Re-summarization successful!' });
    } catch (error) {
        const errorMessage = (error as Error).message;
        toast({ title: 'Re-summarization failed.', description: errorMessage, variant: 'destructive' });
    } finally {
      setIsSummarizing(false);
    }
  };
  
  return (
    <li className="flex flex-col p-2 border rounded space-y-2">
      <div className="flex items-center justify-between">
        {isEditing ? (
          <Input
            value={editedUrl}
            onChange={(e) => setEditedUrl(e.target.value)}
            className="flex-grow"
          />
        ) : (
          <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline truncate">
            {source.title || source.url}
          </a>
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
          <form action={async () => await deleteSource(source.id)}>
            <Button size="sm" variant="destructive">
              <X className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
      
      {summary && (
        <Card>
          <CardContent className="p-2">
            <p className="font-semibold text-sm">Summary:</p>
            <p className="text-xs text-gray-400">{summary}</p>
          </CardContent>
        </Card>
      )}

      <Button onClick={handleResummarize} disabled={isSummarizing} size="sm">
        {isSummarizing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Re-summarize"}
      </Button>
    </li>
  );
}
