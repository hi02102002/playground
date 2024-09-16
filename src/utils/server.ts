import 'server-only';

import { HTTPException } from 'hono/http-exception';
import { StatusCodes } from 'http-status-codes';
import { User } from 'lucia';
import { Session } from 'lucia';
import { cookies } from 'next/headers';
import { cache } from 'react';
import { ZodError, z } from 'zod';

import { lucia } from '@/lib/lucia';

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

export const getBadRequestResponse = () => ({
  description: 'Bad Request',
  content: {
    'application/json': {
      schema: z.object({
        message: z.string(),
      }),
    },
  },
});

export const getUnauthorizedResponse = () => ({
  description: 'Unauthorized',
  content: {
    'application/json': {
      schema: z.object({
        message: z.string(),
      }),
    },
  },
});

export const getForbiddenResponse = () => ({
  description: 'Forbidden',
  content: {
    'application/json': {
      schema: z.object({
        message: z.string(),
      }),
    },
  },
});

export const getNotFoundResponse = () => ({
  description: 'Not Found',
  content: {
    'application/json': {
      schema: z.object({
        message: z.string(),
      }),
    },
  },
});

export const getInternalServerErrorResponse = () => ({
  description: 'Internal Server Error',
  content: {
    'application/json': {
      schema: z.object({
        message: z.string(),
      }),
    },
  },
});

export const validateRequest = cache(
  async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      }
    } catch {}
    return result;
  },
);
