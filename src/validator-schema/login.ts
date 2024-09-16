import { z } from 'zod';

import { EmailSchema, PasswordSchema } from './shared';

export const LoginSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
