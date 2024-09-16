import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import { setCookie } from 'hono/cookie';
import { HTTPException } from 'hono/http-exception';
import { StatusCodes } from 'http-status-codes';

import { lucia } from '@/lib/lucia';
import { hashPassword } from '@/server/services/auth';
import { generateEmailVerifyToken } from '@/server/services/email-verify-token';
import { EmailTemplate, sendMail } from '@/server/services/mail';
import { createUser, getUserByEmail } from '@/server/services/user';
import { ContextVariables } from '@/server/types';
import { defaultHook, getBadRequestResponse, getDefaultSuccessResponse } from '@/utils/server';
import { RegisterSchema } from '@/validator-schema';

export const register = new OpenAPIHono<{
  Variables: ContextVariables;
}>({
  defaultHook,
}).openapi(
  createRoute({
    method: 'post',
    path: '/auth/register',
    tags: ['Auth'],
    summary: 'Register',
    request: {
      body: {
        description: 'Request body',
        content: {
          'application/json': {
            schema: RegisterSchema,
          },
        },
        required: true,
      },
    },
    responses: {
      201: getDefaultSuccessResponse(),
      400: getBadRequestResponse(),
    },
  }),
  async (c) => {
    const { email, password, username } = c.req.valid('json');

    const user = await getUserByEmail(email);

    if (user && user.oAuthAccount?.userId) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: 'Tài khoản này đã được liên kết với một tài khoản khác.',
      });
    }

    if (user) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: 'Tài khoản đã tồn tại.',
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await createUser({
      email,
      password: hashedPassword,
      username,
      emailVerified: false,
    });

    const verificationCode = await generateEmailVerifyToken(newUser.id);

    await sendMail({
      to: email,
      props: {
        code: verificationCode,
      },
      template: EmailTemplate.EmailVerification,
    });

    const session = await lucia.createSession(newUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    setCookie(c, sessionCookie.name, sessionCookie.value, {
      ...sessionCookie.attributes,
    });

    return c.json(
      {
        message: 'Vui lòng kiểm tra email để xác thực tài khoản.',
      },
      StatusCodes.CREATED,
    );
  },
);
