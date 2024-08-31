import "server-only";

import { OpenAPIHono } from "@hono/zod-openapi";

import { googleApp } from "./google";
import { login } from "./login";

export const authApp = new OpenAPIHono()
  .route("/", login)
  .route("/", googleApp);
