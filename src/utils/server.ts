import 'server-only';

import { HTTPException } from 'hono/http-exception';
import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';

import { ResponseSchema } from '@/validator-schema';

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
};

export const getDefaultSuccessResponse = () => ({
  description: 'Success',
  content: {
    'application/json': {
      schema: ResponseSchema.openapi('ResponseSchema'),
    },
  },
});
