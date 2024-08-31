import { env } from "@/env.mjs";
import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({
  path: ".env",
});

export default defineConfig({
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  out: "./drizzle",
});
