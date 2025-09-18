
import React from 'react';
import { DocsSearch } from '@/components/docs-search';

const DocsPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Documentation</h1>
        <DocsSearch />
      </div>
    </div>
  );
};

export default DocsPage;
