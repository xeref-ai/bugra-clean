
import React from 'react';
import { changelogData } from '@/lib/changelog-data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const ChangelogTag = ({ type, text }: { type: string, text: string }) => {
  const typeStyles = {
    New: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    Improved: 'bg-green-500/20 text-green-300 border-green-500/30',
    Fixed: 'bg-red-500/20 text-red-300 border-red-500/30',
  };

  const style = typeStyles[type as keyof typeof typeStyles] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';

  return (
    <div className="flex items-start space-x-3">
      <Badge variant="outline" className={`flex-shrink-0 ${style}`}>{type}</Badge>
      <p className="text-muted-foreground">{text}</p>
    </div>
  );
};

const ChangelogPage = () => {
  // Display only the latest 10 updates
  const recentVersions = changelogData.versions.slice(0, 10);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold tracking-tight">Changelog</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Stay up to date with the latest features and improvements for Xeref.ai.
          </p>
        </header>

        <Card className="mb-12 bg-gradient-to-r from-purple-500/10 to-indigo-600/10 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-xl">Want the full story?</CardTitle>
            <CardDescription>
              In Xerenity Society, Bugra has documented every step of building Xeref from $0 to over $10,000 MRR.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="https://www.skool.com/bugrakarsli1" target="_blank">
                Join the Community <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-12">
          {recentVersions.map((entry) => (
            <Card key={entry.version} className="bg-card border-border/40">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-3xl font-bold">v{entry.version}</CardTitle>
                  <Badge variant="secondary">{entry.date}</Badge>
                </div>
                <CardDescription className="pt-2">
                  {entry.version === changelogData.latestVersion && "The latest and greatest from the Xeref.ai team."}
                </CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {entry.changes.map((change, index) => (
                    <ChangelogTag key={index} type={change.type} text={change.description} />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChangelogPage;
