import { ContextVariables } from "@/server/types";
import { withAuth } from "@/utils/server";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";

export const userApp = new OpenAPIHono<{
  Variables: ContextVariables;
}>().openapi(
  createRoute({
    method: "get",
    path: "/user",
    tags: ["User"],
    summary: "Get user",
    responses: {
      200: {
        description: "Success",
      },
    },
  }),
  async (c) => {
    withAuth(c);

    return c.json(c.get("user"));
  },
);
