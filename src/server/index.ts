import { OpenAPIHono } from '@hono/zod-openapi';
import { apiReference } from '@scalar/hono-api-reference';
import { compress } from 'hono/compress';
import { getCookie } from 'hono/cookie';
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';
import { HTTPException } from 'hono/http-exception';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { StatusCodes } from 'http-status-codes';

import { env } from '@/env.mjs';
import { lucia } from '@/lib/lucia';

import { authApp, userApp } from './routes';
import { ytbMusicApp } from './routes/ytb-music';
import { ContextVariables } from './types';

const app = new OpenAPIHono<{ Variables: ContextVariables }>().basePath('/api');

app.use(compress());
app.use(prettyJSON());
app.use(csrf());
app.use(logger());
app.use(
  cors({
    origin: [env.NEXT_PUBLIC_APP_URL],
    credentials: true,
  }),
);

app.use('*', async (c, next) => {
  const sessionId = getCookie(c, lucia.sessionCookieName) ?? null;
  if (!sessionId) {
    c.set('user', null);
    c.set('session', null);
    return next();
  }
  const { session, user } = await lucia.validateSession(sessionId);
  if (session && session.fresh) {
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
  console.log(err);

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

export const routes = app.route('/', authApp).route('/', userApp).route('/ytb-music', ytbMusicApp);

export type AppType = typeof routes;

export { app };
