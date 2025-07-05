
// src/app/changelog/page.tsx
'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';
import { format } from 'date-fns';
import { changelogData } from '@/lib/changelog-data';

const LogoSvg = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} data-ai-hint="logo compass">
      <path d="M12 2L4 20L12 16L20 20L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const ChangelogEntry = ({ version, date, isLatest, watchLoom, children }: { version: string, date: string, isLatest: boolean, watchLoom?: boolean, children: React.ReactNode }) => (
  <article>
    <div className="flex items-center space-x-4 mb-2">
      <h2 className="text-2xl font-semibold text-foreground">{version}</h2>
      {isLatest && <Badge variant="secondary">Current</Badge>}
      <span className="text-sm text-muted-foreground">{date}</span>
      {watchLoom && (
        <Badge variant="outline" className="text-pink-400 border-pink-400/50 hover:bg-pink-400/10">
            <Video className="mr-1.5 h-3 w-3" />
            Watch Loom
        </Badge>
      )}
    </div>
    <Card className="bg-card/50">
      <CardContent className="p-6">
        <ul className="list-disc list-inside space-y-2 text-sm">
          {children}
        </ul>
      </CardContent>
    </Card>
  </article>
);

const ChangelogTag = ({ type, text }: { type: 'New' | 'Improved' | 'Fix', text: string }) => {
  const colorClass = {
    New: 'text-green-400',
    Improved: 'text-blue-400',
    Fix: 'text-orange-400',
  }[type];
  return (
    <li>
      <span className={`font-semibold ${colorClass}`}>[{type}]</span> {text}
    </li>
  );
};

const ChangelogPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <header className="mb-8 text-center">
         <div className="flex items-center justify-center space-x-3 mb-2">
            <LogoSvg className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Changelog</h1>
        </div>
        <p className="text-muted-foreground mb-4">
          Stay up to date with all the latest improvements to Xeref.ai.
        </p>
        <Badge variant="outline">Version {changelogData.latestVersion}</Badge>
      </header>
      <section className="space-y-8">
        {changelogData.changelog.slice(0, 5).map((entry) => (
          <ChangelogEntry
            key={entry.version}
            version={entry.version}
            date={format(new Date(entry.date), 'MMMM d, yyyy')}
            isLatest={entry.version === changelogData.latestVersion}
            watchLoom={entry.watchLoom}
          >
            {entry.changes.new?.map((text, i) => <ChangelogTag key={`new-${i}`} type="New" text={text} />)}
            {entry.changes.improved?.map((text, i) => <ChangelogTag key={`improved-${i}`} type="Improved" text={text} />)}
            {entry.changes.fix?.map((text, i) => <ChangelogTag key={`fix-${i}`} type="Fix" text={text} />)}
          </ChangelogEntry>
        ))}
      </section>
      <div className="text-center mt-12 border-t border-border pt-8">
        <p className="max-w-2xl mx-auto text-muted-foreground mb-4">
          In the Xerenity Society, Bugra has documented every step of building Xeref from $0 to over $10,000 MRR.
        </p>
        <Link href="https://skool.com/@bugra-karsli-3176" target="_blank" rel="noopener noreferrer" passHref>
          <Button>
            Learn more
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ChangelogPage;
