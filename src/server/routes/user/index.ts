import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import { StatusCodes } from 'http-status-codes';

import { UserSchema } from '@/db/zod-schema';
import { ContextVariables } from '@/server/types';
import { getDefaultSuccessResponse, withAuth } from '@/utils/server';

export const userApp = new OpenAPIHono<{
  Variables: ContextVariables;
}>().openapi(
  createRoute({
    method: 'get',
    path: '/user/me',
    tags: ['User'],
    summary: 'Get current user',
    responses: {
      200: getDefaultSuccessResponse(UserSchema),
    },
  }),
  async (c) => {
    withAuth(c);

    return c.json(
      {
        data: c.get('user'),
      },
      StatusCodes.OK,
    );
  },
);
