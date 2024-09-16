import { z } from 'zod';

export const VerificationCodeSchema = z.object({
  code: z
    .string({
      required_error: 'Mã xác thực không được để trống.',
    })
    .min(1, 'Mã xác thực không được để trống.')
    .max(8, 'Mã xác thực không được quá 8 ký tự.')
    .regex(/^\d+$/, 'Mã xác thực chỉ được chứa số.'),
});

export type VerificationCodeSchemaType = z.infer<typeof VerificationCodeSchema>;
