import 'server-only';

import { eq } from 'drizzle-orm';

import { DbTransactionType, db } from '@/db';
import { users } from '@/db/schema';
import { getAvatar } from '@/utils';

export const getUserById = async (id: string) => {};

export const getUserByEmail = async (email: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
    with: {
      oAuthAccount: true,
    },
  });

  return user;
};

export const createUser = async (data: typeof users.$inferInsert, trx?: DbTransactionType) => {
  const _db = trx || db;

  const [user] = await _db
    .insert(users)
    .values({
      ...data,
      avatarUrl: data.avatarUrl || getAvatar(data.username),
    })
    .returning();

  return user;
};

export const updateUser = async ({
  data,
  id,
  trx,
}: {
  id: string;
  data: Partial<typeof users.$inferInsert>;
  trx?: DbTransactionType;
}) => {
  const _db = trx || db;

  const [user] = await _db.update(users).set(data).where(eq(users.id, id)).returning();

  return user;
};
