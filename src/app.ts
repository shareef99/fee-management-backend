import { logger } from "hono/logger";
import { Hono } from "hono";
import { notFound } from "./middlewares/not-found.ts";

const app = new Hono({ strict: false }).basePath("/api/v1");

app.use(logger());
app.notFound(notFound);

export default app;
