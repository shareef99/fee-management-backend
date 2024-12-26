import "@std/dotenv/load";
import app from "./app.ts";
import env from "./env.ts";
import { organizationRouter } from "./routes/organization/index.ts";
import { staffRouter } from "./routes/staff/index.ts";

const routes = [organizationRouter, staffRouter];
routes.forEach((route) => app.route("/", route));

Deno.serve({ port: env.PORT }, app.fetch);
