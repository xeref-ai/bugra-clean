
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronDown, Inbox, Search, Settings, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from './ui/input';
import { changelogData } from '@/lib/changelog-data';
import Link from 'next/link';

const projects = [
  { name: 'xeref.ai', icon: '🚀' },
  { name: 'skool-community', icon: '🎓' },
  { name: 'youtube-channel', icon: '📺' },
];

export const LeftSidebar = () => {
  return (
    <div className="w-full bg-[#1E1F22] text-gray-300 flex flex-col h-full border-r border-gray-800 overflow-hidden">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">xeref.ai</h2>
          <ChevronDown size={16} />
        </div>
      </div>

      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input placeholder="Search" className="bg-[#2C2D30] border-gray-700 pl-9" />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <nav className="px-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white">
            <Inbox size={16} className="mr-2" />
            Inbox
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white">
            <Star size={16} className="mr-2" />
            Favorites
          </Button>
        </nav>

        <div className="px-4 mt-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Projects</h3>
          <div className="space-y-1">
            {projects.map(project => (
              <Button key={project.name} variant="ghost" className={cn(
                  "w-full justify-start",
                  project.name === 'xeref.ai' ? 'bg-gray-700/50 text-white' : 'text-gray-400 hover:text-white'
              )}>
                <span className="mr-2">{project.icon}</span>
                {project.name}
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-gray-800">
         <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white">
            <Settings size={16} className="mr-2" />
            Settings
          </Button>
          <div className="text-center text-xs text-muted-foreground mt-4">
            <Link href="/changelog" className="hover:underline">
                v{changelogData.latestVersion}
            </Link>
          </div>
      </div>
    </div>
  );
};
