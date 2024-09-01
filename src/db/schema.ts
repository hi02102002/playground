import { relations } from 'drizzle-orm';
import { boolean, index, pgTable, primaryKey, text, timestamp, varchar } from 'drizzle-orm/pg-core';

import { DEFAULT_SCHEMA } from './constant';

export const users = pgTable(
  'users',
  {
    email: varchar('email', {
      length: 255,
    }).notNull(),
    username: text('username').notNull(),
    password: text('password'),
    avatarUrl: text('avatar_url'),
    emailVerified: boolean('email_verified').notNull().default(false),
    ...DEFAULT_SCHEMA,
  },
  (t) => ({
    emailIdx: index('users_email_idx').on(t.email),
    usernameIdx: index('users_username_idx').on(t.username),
  }),
);

export const sessions = pgTable(
  'sessions',
  {
    id: text('id').primaryKey(),
    expiresAt: timestamp('expires_at', {
      withTimezone: true,
      mode: 'date',
    }).notNull(),
    userId: varchar('user_id')
      .notNull()
      .references(() => users.id),
  },
  (table) => ({
    userIdx: index('session_user_idx').on(table.userId),
  }),
);

export const oAuthAccounts = pgTable(
  'oauth_accounts',
  {
    providerId: text('provider_id').notNull(),
    providerUserId: text('provider_user_id').notNull(),
    userId: varchar('user_id')
      .notNull()
      .references(() => users.id, {
        onDelete: 'cascade',
      }),
  },
  (table) => {
    return {
      oauth_accounts_pkey: primaryKey({
        columns: [table.providerId, table.providerUserId],
        name: 'oauth_accounts_pkey',
      }),
    };
  },
);

export const emailVerificationTokens = pgTable('email_verification_tokens', {
  userId: varchar('user_id')
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
  ...DEFAULT_SCHEMA,
  code: varchar('code', {
    length: 8,
  }).notNull(),
});

export const passwordResetTokens = pgTable(
  'password_reset_tokens',
  {
    userId: varchar('user_id')
      .notNull()
      .references(() => users.id),
    expiresAt: timestamp('expires_at', {
      withTimezone: true,
      mode: 'date',
    }).notNull(),
    tokenHash: text('token_hash').unique().notNull(),
    ...DEFAULT_SCHEMA,
  },
  (table) => ({
    userIdx: index('password_reset_user_idx').on(table.userId),
  }),
);

export const usersRelations = relations(users, ({ one }) => {
  return {
    oAuthAccount: one(oAuthAccounts),
  };
});

export const oAuthAccountsRelations = relations(oAuthAccounts, ({ one }) => {
  return {
    user: one(users, {
      fields: [oAuthAccounts.userId],
      references: [users.id],
    }),
  };
});
