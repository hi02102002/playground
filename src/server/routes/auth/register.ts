import { ContextVariables } from "@/server/types";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { defaultHook, getDefaultSuccessResponse } from "@/utils/server";
import { RegisterSchema } from "@/validator-schema";
import { createUser, getUserByEmail } from "@/server/services/user";
import { HTTPException } from "hono/http-exception";
import { StatusCodes } from "http-status-codes";
import { hashPassword } from "@/server/services/auth";

export const register = new OpenAPIHono<{
  Variables: ContextVariables;
}>({
  defaultHook,
}).openapi(
  createRoute({
    method: "post",
    path: "/auth/register",
    tags: ["Auth"],
    summary: "Register",
    request: {
      body: {
        description: "Request body",
        content: {
          "application/json": {
            schema: RegisterSchema.openapi("RegisterSchema"),
          },
        },
        required: true,
      },
    },
    responses: {
      200: getDefaultSuccessResponse(),
    },
  }),
  async (c) => {
    const { email, password, username } = c.req.valid("json");

    const user = await getUserByEmail(email);

    if (user && user.oAuthAccount?.userId) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: "Tài khoản này đã được liên kết với một tài khoản khác.",
      });
    }

    if (user) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: "Tài khoản đã tồn tại",
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await createUser({
      email,
      password: hashedPassword,
      username,
    });
  },
);
