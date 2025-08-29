
'use client';

import { useState, useEffect } from 'react';
import { getActivityLogs } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2 } from 'lucide-react';

export function ActivityList({ initialLogs }: { initialLogs: any[] }) {
  const [logs, setLogs] = useState(initialLogs);
  const [isLoading, setIsLoading] = useState(false);
  const [lastDocId, setLastDocId] = useState<string | undefined>(initialLogs[initialLogs.length - 1]?.id);

  const handleLoadMore = async () => {
    if (!lastDocId) return;
    setIsLoading(true);
    const newLogs = await getActivityLogs({ limit: 20, startAfter: lastDocId });
    setLogs([...logs, ...newLogs]);
    setLastDocId(newLogs[newLogs.length - 1]?.id);
    setIsLoading(false);
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log: any) => (
            <TableRow key={log.id}>
              <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
              <TableCell>{log.userId}</TableCell>
              <TableCell>{log.action}</TableCell>
              <TableCell>{JSON.stringify(log.details)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {lastDocId && (
        <div className="flex justify-center mt-4">
          <Button onClick={handleLoadMore} disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
}
