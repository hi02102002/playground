import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import { differenceInMinutes } from 'date-fns';
import { HTTPException } from 'hono/http-exception';
import { StatusCodes } from 'http-status-codes';

import redis from '@/lib/redis';
import { generateEmailVerifyToken } from '@/server/services/email-verify-token';
import { EmailTemplate, sendMail } from '@/server/services/mail';
import { ContextVariables } from '@/server/types';
import { defaultHook, getDefaultSuccessResponse, withAuth } from '@/utils/server';

export const sendVerificationAccount = new OpenAPIHono<{
  Variables: ContextVariables;
}>({
  defaultHook,
}).openapi(
  createRoute({
    method: 'post',
    path: '/auth/send-verification-account',
    summary: 'Send verification account',
    tags: ['Auth'],
    responses: {
      200: getDefaultSuccessResponse(),
    },
  }),
  async (c) => {
    const user = withAuth(c);

    if (user.emailVerified) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: 'Tài khoản đã được xác thực.',
      });
    }

    const lastSent = await redis?.get(`email-verification:${user.id}`);

    if (lastSent && differenceInMinutes(Date.now(), parseInt(lastSent, 10)) < 1) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: 'Vui lòng chờ ít nhất 1 phút trước khi gửi lại.',
      });
    }

    const verificationCode = await generateEmailVerifyToken(user.id);

    await sendMail({
      to: user.email,
      props: {
        code: verificationCode,
      },
      template: EmailTemplate.EmailVerification,
    });

    await redis?.set(`email-verification:${user.id}`, Date.now(), 'EX', 60);

    return c.json(
      {
        message: 'Gửi mã xác thực thành công.',
      },
      StatusCodes.OK,
    );
  },
);
