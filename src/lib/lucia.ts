import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { Google } from 'arctic';
import { Lucia, TimeSpan } from 'lucia';

import { TUser, db } from '@/db';
import { sessions, users } from '@/db/schema';
import { env } from '@/env.mjs';
import { absoluteUrl } from '@/utils';

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: env.NODE_ENV === 'production',
    },
    name: 'lucia.sid',
  },
  getUserAttributes: (attributes) => {
    return attributes;
  },
  sessionExpiresIn: new TimeSpan(30, 'd'),
});

export const google = new Google(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  absoluteUrl('/api/auth/google/callback'),
);

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<TUser, 'password'>;
  }
}
