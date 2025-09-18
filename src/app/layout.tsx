
import type { Metadata, Viewport } from 'next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/lib/auth';
import { TooltipProvider } from '@/components/ui/tooltip';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://xeref.ai'),
  title: 'Xeref.ai - Advanced AI Platform by Bugra Karsli',
  description: 'Xeref.ai is an innovative AI platform created by Bugra Karsli and the Xerenity Society team. Experience next-generation AI solutions.',
  keywords: ['Xeref.ai', 'Bugra Karsli', 'AI platform', 'artificial intelligence', 'Xerenity Society', 'machine learning'],
  alternates: {
    canonical: 'https://xeref.ai',
  },
  openGraph: {
    title: 'Xeref.ai - Revolutionary AI Platform',
    description: 'Discover Xeref.ai, the cutting-edge AI platform built by Bugra Karsli and Xerenity Society.',
    url: 'https://xeref.ai',
    images: [
      {
        url: '/assets/xeref-ai-platform.jpg',
        width: 1200,
        height: 630,
        alt: 'Xeref.ai Platform',
      },
    ],
    siteName: 'Xeref.ai',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@XerefAI',
    creator: '@BugraKarsli1',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <TooltipProvider>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </TooltipProvider>
      </body>
    </html>
  );
};

export default RootLayout;
