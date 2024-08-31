import { z } from 'zod';

import { EmailSchema, PasswordSchema } from './shared';

export const LoginSchema = z
  .object({
    email: EmailSchema,
    password: PasswordSchema,
  })
  .openapi('LoginSchema', {
    example: {
      email: 'exmaple@gmail.com',
      password: 'examplepassword',
    },
  });

export type LoginSchemaType = z.infer<typeof LoginSchema>;
