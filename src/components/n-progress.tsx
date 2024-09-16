'use client';

import { AppProgressBar } from 'next-nprogress-bar';

export const NProgress = () => {
  return (
    <AppProgressBar
      height="1px"
      color="var(hsl(--primary))"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
};
