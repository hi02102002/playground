import 'server-only';

import { eq } from 'drizzle-orm';
import { TimeSpan, createDate, isWithinExpirationDate } from 'oslo';
import { alphabet, generateRandomString } from 'oslo/crypto';

import { db } from '@/db';
import { emailVerificationTokens } from '@/db/schema';

export const getEmailVerifyTokenByUserId = async (userId: string) => {
  const token = await db.query.emailVerificationTokens.findFirst({
    where: eq(emailVerificationTokens.userId, userId),
  });

  return token;
};

export const removeEmailVerifyTokenByUserId = async (userId: string) => {
  await db.delete(emailVerificationTokens).where(eq(emailVerificationTokens.userId, userId));
};

export const generateEmailVerifyToken = async (userId: string) => {
  const existingToken = await getEmailVerifyTokenByUserId(userId);

  if (existingToken && isWithinExpirationDate(existingToken.expiresAt)) {
    return existingToken.code;
  }

  if (existingToken) {
    await removeEmailVerifyTokenByUserId(userId);
  }

  const code = generateRandomString(8, alphabet('0-9'));

  await db.insert(emailVerificationTokens).values({
    userId,
    expiresAt: createDate(new TimeSpan(5, 'm')),
    code,
  });

  return code;
};

export const verifyVerificationToken = async (userId: string, code: string) => {
  const token = await getEmailVerifyTokenByUserId(userId);

  if (!token || token.code !== code) {
    return false;
  }

  if (!isWithinExpirationDate(token.expiresAt)) {
    return false;
  }

  await removeEmailVerifyTokenByUserId(userId);

  return true;
};
