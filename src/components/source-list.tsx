
'use client';

import { useState, useEffect } from 'react';
import { getSources } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SourceListItem } from '@/components/source-list-item';
import { Loader2 } from 'lucide-react';

export function SourceList({ initialSources }: { initialSources: any[] }) {
  const [sources, setSources]       = useState(initialSources);
  const [statusFilter, setStatusFilter] = useState('');
  const [isLoading, setIsLoading]     = useState(false);
  const [lastDocId, setLastDocId]     = useState<string | undefined>(initialSources[initialSources.length - 1]?.id);

  useEffect(() => {
    const fetchFilteredSources = async () => {
      setIsLoading(true);
      const newSources = await getSources({ status: statusFilter, limit: 10 });
      setSources(newSources);
      setLastDocId(newSources[newSources.length - 1]?.id);
      setIsLoading(false);
    };

    fetchFilteredSources();
  }, [statusFilter]);

  const handleLoadMore = async () => {
    if (!lastDocId) return;
    setIsLoading(true);
    const newSources = await getSources({ status: statusFilter, limit: 10, startAfter: lastDocId });
    setSources([...sources, ...newSources]);
    setLastDocId(newSources[newSources.length - 1]?.id);
    setIsLoading(false);
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Select onValueChange={setStatusFilter} defaultValue="">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="summarized">Summarized</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading && sources.length === 0 ? (
        <div className="flex justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>
      ) : (
        <ul className="space-y-2">
          {sources.map((source: any) => (
            <SourceListItem key={source.id} source={source} />
          ))}
        </ul>
      )}

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
