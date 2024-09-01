import 'server-only';

import { OpenAPIHono } from '@hono/zod-openapi';

import { emailVerification } from './email-verification';
import { googleApp } from './google';
import { login } from './login';
import { register } from './register';
import { resetPasswordApp } from './reset-password';
import { sendVerificationAccount } from './send-verification-account';

export const authApp = new OpenAPIHono()
  .route('/', login)
  .route('/', googleApp)
  .route('/', register)
  .route('/', emailVerification)
  .route('/', sendVerificationAccount)
  .route('/', resetPasswordApp);
