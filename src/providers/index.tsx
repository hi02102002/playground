'use client';

import { ReactNode } from 'react';

import { QueryClientProvider } from './query-client-provider';
import { ThemeProvider } from './theme-provider';

type Props = {
  children: ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <QueryClientProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
};
