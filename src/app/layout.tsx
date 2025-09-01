
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";
import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/lib/auth';
import { Toaster } from '@/components/ui/toaster';
import { dashboardConfig } from "@/lib/dashboard-config";

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { bg, panel, muted, text, accent, accentMuted, border } = dashboardConfig.theme.colors;
  const style = {
    '--bg-color': bg,
    '--panel-color': panel,
    '--muted-color': muted,
    '--text-color': text,
    '--accent-color': accent,
    '--accent-muted-color': accentMuted,
    '--border-color': border,
    '--font-family': dashboardConfig.theme.font.family,
    '--font-size': `${dashboardConfig.theme.font.size}px`,
    '--radius': `${dashboardConfig.theme.radius}px`,
  } as React.CSSProperties;


  return (
    <html lang="en">
      <body className={inter.className} style={style}>
        <AuthProvider>
          <Providers>
            {children}
            <Toaster />
            <Analytics />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
