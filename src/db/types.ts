import { ExtractTablesWithRelations } from 'drizzle-orm';
import { PgTransaction } from 'drizzle-orm/pg-core';
import { PostgresJsQueryResultHKT } from 'drizzle-orm/postgres-js';

import { db } from './db';
import * as schema from './schema';

export type DbType = typeof db;
export type TUser = typeof schema.users.$inferSelect;

export type DbTransactionType = PgTransaction<
  PostgresJsQueryResultHKT,
  typeof schema,
  ExtractTablesWithRelations<typeof schema>
>;
