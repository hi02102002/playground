import 'server-only';

import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { generateCodeVerifier, generateState } from 'arctic';
import { setCookie } from 'hono/cookie';

import { env } from '@/env.mjs';
import { google } from '@/lib/lucia';
import { ContextVariables } from '@/server/types';

export const loginGoogle = new OpenAPIHono<{
  Variables: ContextVariables;
}>().openapi(
  createRoute({
    method: 'get',
    summary: 'Login with Google',
    path: '/auth/google/login',
    tags: ['Auth'],
    responses: {
      200: {
        description: 'Success',
      },
    },
    request: {
      query: z.object({
        redirect: z.string().optional(),
      }),
    },
  }),
  async (c) => {
    const state = generateState();

    const codeVerifier = generateCodeVerifier();

    const url = await google.createAuthorizationURL(state, codeVerifier, {
      scopes: ['email', 'profile'],
    });

    setCookie(c, 'google_oauth_state', state, {
      secure: env.NODE_ENV === 'production',
      path: '/',
      httpOnly: true,
      maxAge: 60 * 10,
    });

    setCookie(c, 'google_code_verifier', codeVerifier, {
      secure: env.NODE_ENV === 'production',
      path: '/',
      httpOnly: true,
      maxAge: 60 * 10,
    });

    url.searchParams.set('redirect', c.req.query('redirect')?.toString() ?? '/');

    return c.redirect(url.toString());
  },
);
