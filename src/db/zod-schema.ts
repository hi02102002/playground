import { createSelectSchema } from 'drizzle-zod';

import { users } from './schema';

export const UserSchema = createSelectSchema(users).omit({ password: true }).openapi('UserSchema');
