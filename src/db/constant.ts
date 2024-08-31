import { createId } from '@paralleldrive/cuid2';
import { timestamp, varchar } from 'drizzle-orm/pg-core';

export const DEFAULT_SCHEMA = {
  id: varchar('id', {
    length: 255,
  })
    .primaryKey()
    .$defaultFn(() => createId()),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdateFn(() => new Date()),
};
