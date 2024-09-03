import { cache } from 'react';

import { TUser } from '@/db';
import { client } from '@/server/client';

export const withAuth = cache(async () => {
  try {
    const res = await client.api.user.me.$get();

    const user = (await res.json()) as TUser | null;

    if (!user) return null;

    return user;
  } catch (error) {
    return null;
  }
});
