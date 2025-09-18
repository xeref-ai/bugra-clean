
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Link2 } from 'lucide-react';

interface CitationProps {
  source: string;
}

export const Citation = ({ source }: CitationProps) => {
  return (
    <a href={source} target="_blank" rel="noopener noreferrer">
      <Badge variant="outline" className="mt-2">
        <Link2 className="h-3 w-3 mr-1" />
        Source
      </Badge>
    </a>
  );
};
