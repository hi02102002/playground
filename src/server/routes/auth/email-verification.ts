import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import { setCookie } from 'hono/cookie';
import { HTTPException } from 'hono/http-exception';
import { StatusCodes } from 'http-status-codes';

import { lucia } from '@/lib/lucia';
import { verifyVerificationToken } from '@/server/services/email-verify-token';
import { updateUser } from '@/server/services/user';
import { ContextVariables } from '@/server/types';
import { defaultHook, getDefaultSuccessResponse, withAuth } from '@/utils/server';
import { VerificationCodeSchema } from '@/validator-schema/verification-code';

export const emailVerification = new OpenAPIHono<{
  Variables: ContextVariables;
}>({
  defaultHook,
}).openapi(
  createRoute({
    method: 'post',
    path: '/auth/email-verification',
    summary: 'Verify email',
    tags: ['Auth'],
    responses: {
      200: getDefaultSuccessResponse(),
    },
    request: {
      body: {
        description: 'Request body',
        content: {
          'application/json': {
            schema: VerificationCodeSchema,
          },
        },
      },
    },
  }),
  async (c) => {
    const { code } = c.req.valid('json');

    withAuth(c);

    const user = c.get('user');

    if (!user) {
      throw new HTTPException(StatusCodes.UNAUTHORIZED, {
        message: 'Unauthorized',
      });
    }

    const validCode = await verifyVerificationToken(user.id, code);

    if (!validCode) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: 'Mã xác thực không hợp lệ hoặc đã hết hạn.',
      });
    }

    await lucia.invalidateUserSessions(user.id);

    await updateUser({
      id: user.id,
      data: {
        emailVerified: true,
      },
    });

    const session = await lucia.createSession(user.id, {});
    const cookie = lucia.createSessionCookie(session.id);

    setCookie(c, cookie.name, cookie.value, {
      ...cookie.attributes,
      sameSite: 'Strict',
    });

    return c.json(
      {
        message: 'Tài khoản đã được xác thực thành công.',
      },
      StatusCodes.OK,
    );
  },
);
