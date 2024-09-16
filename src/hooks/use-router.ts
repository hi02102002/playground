import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { usePathname } from 'next/navigation';
import { useRouter as useNextRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export const useRouter = () => {
  const router = useNextRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);
  const replace = useCallback(
    (href: string, options?: NavigateOptions) => {
      if (href !== pathname) {
        setIsLoading(true);
      }
      router.replace(href, options);
    },
    [router, pathname],
  );

  const push = useCallback(
    (href: string, options?: NavigateOptions) => {
      if (href !== pathname) {
        setIsLoading(true);
      }
      router.push(href, options);
    },
    [router, pathname],
  );

  return {
    ...router,
    replace,
    push,
    isLoading,
  };
};
