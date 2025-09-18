
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Search } from 'lucide-react';
import { getFunctions, httpsCallable } from 'firebase/functions';

export const DocsSearch = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse(null);

    try {
      const functions = getFunctions();
      const apiProxyRAG = httpsCallable(functions, 'apiProxyRAG');
      const result = await apiProxyRAG({ query });
      setResponse(result.data);
    } catch (error) {
      console.error("Error calling RAG API:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="flex items-center space-x-2">
        <Input
          type="search"
          placeholder="Ask a question about the documentation..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin" /> : <Search />}
        </Button>
      </form>

      {response && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Answer</h2>
          <p>{response.response}</p>
          <h3 className="text-xl font-bold mt-8 mb-4">Sources</h3>
          <ul>
            {response.sources.map((source: any, index: number) => (
              <li key={index} className="mb-2">
                <a href={source.datapoint.datapointId} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  {source.datapoint.datapointId}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
