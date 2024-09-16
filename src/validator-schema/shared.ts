import { z } from 'zod';

export const EmailSchema = z
  .string({
    required_error: 'Email không được để trống.',
  })
  .min(1, 'Email không được để trống.')
  .email('Email không hợp lệ.');

export const PasswordSchema = z
  .string({
    required_error: 'Mật khẩu không được để trống.',
  })
  .min(8, 'Mật khẩu phải chứa ít nhất 8 ký tự.');

export const ConfirmPasswordSchema = z
  .string({
    required_error: 'Xác nhận mật khẩu không được để trống.',
  })
  .min(1, 'Xác nhận mật khẩu không được để trống.');
