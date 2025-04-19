import { logger } from "hono/logger";
import { Hono } from "hono";
import { notFound } from "./middlewares/not-found.ts";
import { cors } from "hono/cors";
import env from "./env.ts";

const app = new Hono({ strict: false }).basePath("/api/v1");

app.use(
  "*",
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(logger());
app.notFound(notFound);

export default app;
