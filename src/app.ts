import { logger } from "hono/logger";
import { Hono } from "hono";

const app = new Hono({ strict: false });

app.use(logger());

export default app;
