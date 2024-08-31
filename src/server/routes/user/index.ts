import { OpenAPIHono, createRoute } from '@hono/zod-openapi';

import { ContextVariables } from '@/server/types';
import { withAuth } from '@/utils/server';

export const userApp = new OpenAPIHono<{
  Variables: ContextVariables;
}>().openapi(
  createRoute({
    method: 'get',
    path: '/user',
    tags: ['User'],
    summary: 'Get user',
    responses: {
      200: {
        description: 'Success',
      },
    },
  }),
  async (c) => {
    withAuth(c);

    return c.json(c.get('user'));
  },
);
