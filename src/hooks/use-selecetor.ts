import { Updater, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

type Props<T> = {
  keys: string[];
  queryFn: UseQueryOptions<T | undefined>['queryFn'];
  opts?: Omit<UseQueryOptions<T | undefined>, 'queryKey' | 'queryFn'>;
};

export const useSelector = <T>({ keys, queryFn, opts = {} }: Props<T>) => {
  const queryClient = useQueryClient();

  const { data } = useQuery<T | undefined>({
    queryKey: keys,
    queryFn,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    ...opts,
  });

  const setData = useCallback(
    (updater: Updater<T | undefined, T | undefined>) =>
      queryClient.setQueryData<T | undefined>(keys, updater),
    [keys, queryClient],
  );

  return [data, setData] as const;
};
