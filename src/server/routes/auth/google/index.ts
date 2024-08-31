import { OpenAPIHono } from '@hono/zod-openapi';

import { ContextVariables } from '@/server/types';

import { googleCallback } from './callback';
import { loginGoogle } from './login';

export const googleApp = new OpenAPIHono<{
  Variables: ContextVariables;
}>()
  .route('/', loginGoogle)
  .route('/', googleCallback);
