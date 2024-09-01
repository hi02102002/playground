import { z } from 'zod';

import { ConfirmPasswordSchema, EmailSchema, PasswordSchema } from './shared';

export const SendResetPasswordSchema = z
  .object({
    email: EmailSchema,
  })
  .openapi('SendResetPasswordSchema');

export type SendResetPasswordSchemaType = z.infer<typeof SendResetPasswordSchema>;

export const ResetPasswordSchema = z
  .object({
    password: PasswordSchema,
    confirmPassword: ConfirmPasswordSchema,
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Mật khẩu không khớp',
      });
    }
  })
  .openapi('ResetPasswordSchema');

export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;
