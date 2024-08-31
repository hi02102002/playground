import { OpenAPIHono } from '@hono/zod-openapi';
import { apiReference } from '@scalar/hono-api-reference';
import { getCookie } from 'hono/cookie';
import { csrf } from 'hono/csrf';
import { HTTPException } from 'hono/http-exception';
import { StatusCodes } from 'http-status-codes';

import { lucia } from '@/lib/lucia';

import { authApp, userApp } from './routes';
import { ContextVariables } from './types';

const app = new OpenAPIHono<{ Variables: ContextVariables }>().basePath('/api');

app.use(csrf());

app.use('*', async (c, next) => {
  const sessionId = getCookie(c, lucia.sessionCookieName) ?? null;
  if (!sessionId) {
    c.set('user', null);
    c.set('session', null);
    return next();
  }
  const { session, user } = await lucia.validateSession(sessionId);
  if (session && session.fresh) {
    // use `header()` instead of `setCookie()` to avoid TS errors
    c.header('Set-Cookie', lucia.createSessionCookie(session.id).serialize(), {
      append: true,
    });
  }
  if (!session) {
    c.header('Set-Cookie', lucia.createBlankSessionCookie().serialize(), {
      append: true,
    });
  }
  c.set('user', user);
  c.set('session', session);
  return next();
});

app.doc31('/swagger.json', {
  openapi: '3.1.0',
  info: { title: 'Hono x Lucia', version: '1.0.0' },
});

app.get(
  '/scalar',
  apiReference({
    spec: {
      url: '/api/swagger.json',
    },
  }),
);

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json(
      {
        message: err.message || 'Internal Server Error',
      },
      err.status || StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }

  return c.json(
    {
      message: 'Internal Server Error',
    },
    StatusCodes.INTERNAL_SERVER_ERROR,
  );
});

export const routes = app.route('/', authApp).route('/', userApp);

export type AppType = typeof routes;

export { app };
