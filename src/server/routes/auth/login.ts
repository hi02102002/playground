import 'server-only';

import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import { setCookie } from 'hono/cookie';
import { HTTPException } from 'hono/http-exception';
import { StatusCodes } from 'http-status-codes';

import { lucia } from '@/lib/lucia';
import { verifyPassword } from '@/server/services/auth';
import { getUserByEmail } from '@/server/services/user';
import { ContextVariables } from '@/server/types';
import { defaultHook, getDefaultSuccessResponse } from '@/utils/server';
import { LoginSchema } from '@/validator-schema/login';

export const login = new OpenAPIHono<{
  Variables: ContextVariables;
}>({
  defaultHook,
}).openapi(
  createRoute({
    method: 'post',
    path: '/auth/login',
    tags: ['Auth'],
    summary: 'Login',
    request: {
      body: {
        description: 'Request body',
        content: {
          'application/json': {
            schema: LoginSchema,
          },
        },
        required: true,
      },
    },
    responses: {
      200: getDefaultSuccessResponse(),
    },
  }),
  async (c) => {
    const { email, password } = c.req.valid('json');

    const user = await getUserByEmail(email);

    if (!user) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: 'Email không tồn tại.',
      });
    }

    if (user.oAuthAccount?.userId) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: 'Tài khoản này đã được liên kết với một tài khoản khác.',
      });
    }

    if (!user.password) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: 'Tài khoản này đã được liên kết với một tài khoản khác.',
      });
    }

    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: 'Mật khẩu không đúng.',
      });
    }

    const session = await lucia.createSession(user.id, {});

    const cookie = lucia.createSessionCookie(session.id);

    setCookie(c, cookie.name, cookie.value, {
      ...cookie.attributes,
      sameSite: 'Strict',
    });

    return c.json(
      {
        message: 'Đăng nhập thành công.',
      },
      StatusCodes.OK,
    );
  },
);
