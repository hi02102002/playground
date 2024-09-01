import { eq } from 'drizzle-orm';
import { TimeSpan, generateIdFromEntropySize } from 'lucia';
import { createDate, isWithinExpirationDate } from 'oslo';
import { sha256 } from 'oslo/crypto';
import { encodeHex } from 'oslo/encoding';

import { db } from '@/db';
import { passwordResetTokens } from '@/db/schema';

export const getPasswordResetTokenByToken = async (tokenHash: string) => {
  const passwordResetToken = await db.query.passwordResetTokens.findFirst({
    where: eq(passwordResetTokens.tokenHash, tokenHash),
  });

  return passwordResetToken;
};

export const removePasswordResetToken = async (tokenHash: string) => {
  const [removed] = await db
    .delete(passwordResetTokens)
    .where(eq(passwordResetTokens.tokenHash, tokenHash))
    .returning();

  return removed;
};

export const createPasswordResetToken = async (userId: string) => {
  await db.delete(passwordResetTokens).where(eq(passwordResetTokens.userId, userId));

  const tokenId = generateIdFromEntropySize(25);

  const tokenHash = encodeHex(await sha256(new TextEncoder().encode(tokenId)));

  await db.insert(passwordResetTokens).values({
    userId,
    expiresAt: createDate(new TimeSpan(2, 'h')),
    tokenHash,
  });

  return tokenId;
};

export const verifyPasswordResetToken = async (token: string) => {
  const tokenHash = encodeHex(await sha256(new TextEncoder().encode(token)));

  const passwordResetToken = await getPasswordResetTokenByToken(tokenHash);

  if (passwordResetToken) {
    await removePasswordResetToken(passwordResetToken.tokenHash);
  }

  if (!passwordResetToken || !isWithinExpirationDate(passwordResetToken.expiresAt)) {
    return {
      valid: false,
      userId: null,
    };
  }

  return {
    valid: true,
    userId: passwordResetToken.userId,
  };
};
