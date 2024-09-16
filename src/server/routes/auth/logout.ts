import 'server-only';

import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import { StatusCodes } from 'http-status-codes';

import { lucia } from '@/lib/lucia';
import { ContextVariables } from '@/server/types';
import { defaultHook, getBadRequestResponse, getDefaultSuccessResponse } from '@/utils/server';

export const logout = new OpenAPIHono<{
  Variables: ContextVariables;
}>({
  defaultHook,
}).openapi(
  createRoute({
    method: 'post',
    path: '/auth/logout',
    tags: ['Auth'],
    summary: 'Login',
    responses: {
      200: getDefaultSuccessResponse(),
      400: getBadRequestResponse(),
    },
  }),
  async (c) => {
    const session = c.get('session');

    c.set('user', null);
    c.set('session', null);

    if (session) {
      await lucia.invalidateSession(session?.id);
    }

    c.header('Set-Cookie', lucia.createBlankSessionCookie().serialize());

    return c.json(
      {
        message: 'Đăng xuất tài khoản thành công.',
      },
      StatusCodes.OK,
    );
  },
);
