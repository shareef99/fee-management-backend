import { defineConfig } from "drizzle-kit";
import env from "./src/env.ts";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/routes/**/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
