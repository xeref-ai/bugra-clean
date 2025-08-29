
'use client';

import Link from 'next/link';
import React from 'react';
import { featureFlags } from '@/lib/feature-flags';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen bg-background text-foreground">
      <nav className="w-64 border-r border-gray-800 p-4">
        <h2 className="text-xl font-bold mb-4">bugrakarsli.com Admin</h2>
        <ul className="space-y-2">
          <li>
            <Link href="/bugrakarsli" className="hover:text-primary">Dashboard</Link>
          </li>
          <li>
            <Link href="/bugrakarsli/projects" className="hover:text-primary">Projects</Link>
          </li>
          <li>
            <Link href="/bugrakarsli/sources" className="hover:text-primary">Sources</Link>
          </li>
          {featureFlags.isPublicActivityPageEnabled() && (
            <li>
              <Link href="/bugrakarsli/activity" className="hover:text-primary">Activity</Link>
            </li>
          )}
        </ul>
      </nav>
      <main className="flex-grow p-6">
        {children}
      </main>
    </div>
  );
}
