import { z } from 'zod';

export const VerificationCodeSchema = z
  .object({
    code: z
      .string({
        required_error: 'Mã xác thực không được để trống.',
      })
      .min(1, 'Mã xác thực không được để trống.')
      .max(8, 'Mã xác thực không được quá 8 ký tự.')
      .regex(/^\d+$/, 'Mã xác thực chỉ được chứa số.')
      .openapi({
        example: '12345678',
      }),
  })
  .openapi('VerificationCodeSchema');
