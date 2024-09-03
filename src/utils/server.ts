import 'server-only';

import { HTTPException } from 'hono/http-exception';
import { StatusCodes } from 'http-status-codes';
import { ZodError, z } from 'zod';

export const defaultHook = (
  result:
    | {
        success: false;
        error: ZodError;
      }
    | {
        success: true;
        data: any;
      },
  c: any,
) => {
  if (!result.success) {
    return c.json(
      {
        message: result.error.issues[0].message,
      },
      StatusCodes.BAD_REQUEST,
    );
  }
};

export const withAuth = (c: any) => {
  const user = c.get('user');

  if (!user) {
    throw new HTTPException(StatusCodes.UNAUTHORIZED, {
      message: 'Unauthorized',
    });
  }

  return user;
};

export const getDefaultSuccessResponse = (data?: z.ZodTypeAny) => ({
  description: 'Success',
  content: {
    'application/json': {
      schema: z.object({
        message: z.string().optional(),
        data: data ?? z.unknown().optional(),
      }),
    },
  },
});
