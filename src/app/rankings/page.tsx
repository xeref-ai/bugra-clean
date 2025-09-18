// src/app/rankings/page.tsx
import React from 'react';

const RankingsPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Rankings</h1>
        <p className="text-muted-foreground">
          This page will display rankings. Content coming soon!
        </p>
      </header>
      <section className="bg-card p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-card-foreground mb-4">Placeholder Content</h2>
        <div className="flex items-center justify-center h-64 border-2 border-dashed border-border rounded-md">
          <p className="text-muted-foreground">Rankings data will be displayed here.</p>
        </div>
      </section>
    </div>
  );
};

export default RankingsPage;