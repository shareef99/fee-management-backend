import "@std/dotenv/load";
import app from "./app.ts";
import { organizationRouter } from "./routes/organization/index.ts";
import env from "./env.ts";

const routes = [organizationRouter];
routes.forEach((route) => app.route("/", route));

Deno.serve({ port: env.PORT }, app.fetch);
