import { eq } from 'drizzle-orm';

import { DbTransactionType, db } from '@/db';
import { oAuthAccounts } from '@/db/schema';

export const getAccountByProviderUserId = async (providerUserId: string) => {
  const account = await db.query.oAuthAccounts.findFirst({
    where: eq(oAuthAccounts.providerUserId, providerUserId),
  });

  return account;
};

export const createAccount = async (
  data: typeof oAuthAccounts.$inferInsert,
  trx?: DbTransactionType,
) => {
  const _db = trx || db;

  const [account] = await _db.insert(oAuthAccounts).values(data).returning();

  return account;
};
