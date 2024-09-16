'use client';

import { QueryClient, QueryClientProvider as _QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export const QueryClientProvider = ({ children }: { children: any }) => {
  const [client] = useState(() => new QueryClient());
  return <_QueryClientProvider client={client}>{children}</_QueryClientProvider>;
};
