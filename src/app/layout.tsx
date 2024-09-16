import './globals.css';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

import { BgNoise } from '@/components/bg-noise';
import { NProgress } from '@/components/n-progress';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import { Providers } from '@/providers';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Share Music',
  description: 'Share music with your friends. Create a room and listen together.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <NProgress />
        <Toaster duration={3000} position="top-center" />
        <Providers>
          <BgNoise>{children}</BgNoise>
        </Providers>
      </body>
    </html>
  );
}
