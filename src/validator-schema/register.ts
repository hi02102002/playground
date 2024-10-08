import { z } from 'zod';

import { ConfirmPasswordSchema, EmailSchema, PasswordSchema } from './shared';

export const RegisterSchema = z
  .object({
    email: EmailSchema,
    password: PasswordSchema,
    confirmPassword: ConfirmPasswordSchema,
    username: z
      .string({
        required_error: 'Tên người dùng không được để trống.',
      })
      .min(1, 'Tên người dùng không được để trống.'),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (password !== confirmPassword) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Mật khẩu không khớp',
        path: ['confirmPassword'],
      });
    }
  });

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
