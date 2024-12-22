import "@std/dotenv/load";
import "./env.ts";
import app from "./app.ts";
import { organizationRouter } from "./routes/organization/index.ts";

const routes = [organizationRouter];
routes.forEach((route) => app.route("/", route));

Deno.serve({ port: 5000 }, app.fetch);
