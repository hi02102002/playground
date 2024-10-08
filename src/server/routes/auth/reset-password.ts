import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import { differenceInMinutes } from 'date-fns';
import { HTTPException } from 'hono/http-exception';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

import { lucia } from '@/lib/lucia';
import redis from '@/lib/redis';
import { hashPassword } from '@/server/services/auth';
import { EmailTemplate, sendMail } from '@/server/services/mail';
import {
  createPasswordResetToken,
  verifyPasswordResetToken,
} from '@/server/services/password-reset-token';
import { getUserByEmail, updateUser } from '@/server/services/user';
import { ContextVariables } from '@/server/types';
import { absoluteUrl } from '@/utils';
import { defaultHook, getDefaultSuccessResponse } from '@/utils/server';
import { ResetPasswordSchema, SendResetPasswordSchema } from '@/validator-schema/reset-password';

const resetPasswordApp = new OpenAPIHono<{
  Variables: ContextVariables;
}>({
  defaultHook,
})
  .openapi(
    createRoute({
      method: 'post',
      path: '/auth/reset-password',
      summary: 'Send reset password email',
      tags: ['Auth'],
      responses: {
        200: getDefaultSuccessResponse(),
      },
      request: {
        body: {
          description: 'Request body',
          content: {
            'application/json': {
              schema: SendResetPasswordSchema,
            },
          },
          required: true,
        },
      },
    }),
    async (c) => {
      const { email } = c.req.valid('json');

      const user = await getUserByEmail(email);

      if (!user) {
        throw new HTTPException(StatusCodes.BAD_REQUEST, {
          message: 'Email không tồn tại.',
        });
      }

      if (user.oAuthAccount?.userId) {
        throw new HTTPException(StatusCodes.BAD_REQUEST, {
          message: 'Tài khoản này đã được sử dụng ở phương thức đăng nhập khác.',
        });
      }

      const lastSent = await redis?.get(`password-reset:${user.id}`);

      if (lastSent && differenceInMinutes(Date.now(), parseInt(lastSent, 10)) < 1) {
        throw new HTTPException(StatusCodes.BAD_REQUEST, {
          message: 'Vui lòng chờ ít nhất 1 phút trước khi gửi lại.',
        });
      }

      const verificationToken = await createPasswordResetToken(user.id);

      const verificationLink = absoluteUrl(`/reset-password/${verificationToken}`);

      await sendMail({
        to: email,
        template: EmailTemplate.PasswordReset,
        props: {
          link: verificationLink,
        },
      });

      await redis?.set(`password-reset:${user.id}`, Date.now(), 'EX', 60);

      return c.json(
        {
          message: 'Vui lòng kiểm tra email để đặt lại mật khẩu.',
        },
        StatusCodes.OK,
      );
    },
  )
  .openapi(
    createRoute({
      method: 'post',
      path: '/auth/reset-password/{token}',
      summary: 'Reset password',
      tags: ['Auth'],
      responses: {
        200: getDefaultSuccessResponse(),
      },
      request: {
        params: z.object({
          token: z.string(),
        }),
        body: {
          content: {
            'application/json': {
              schema: ResetPasswordSchema,
            },
          },
        },
      },
    }),
    async (c) => {
      const { token } = c.req.valid('param');
      const { password } = c.req.valid('json');

      const { userId, valid } = await verifyPasswordResetToken(token);

      if (!valid || !userId) {
        throw new HTTPException(StatusCodes.BAD_REQUEST, {
          message: 'Đường dẫn không hợp lệ hoặc đã hết hạn.',
        });
      }

      await lucia.invalidateUserSessions(userId);

      await updateUser({
        id: userId,
        data: {
          password: await hashPassword(password),
        },
      });

      c.header('Referrer-Policy', 'strict-origin');

      return c.json(
        {
          message: 'Mật khẩu đã được đặt lại.',
        },
        StatusCodes.OK,
      );
    },
  );

export { resetPasswordApp };
