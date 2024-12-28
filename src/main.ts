import "@std/dotenv/load";
import app from "./app.ts";
import env from "./env.ts";
import { organizationRouter } from "./routes/organization/index.ts";
import { staffRouter } from "./routes/staff/index.ts";
import { parentsRouter } from "./routes/parents/index.ts";
import { gradesRouter } from "./routes/grades/index.ts";
import { academicYearRouter } from "./routes/academic-year/index.ts";
import { studentsRouter } from "./routes/students/index.ts";

const routes = [
  organizationRouter,
  staffRouter,
  parentsRouter,
  gradesRouter,
  academicYearRouter,
  studentsRouter,
];
routes.forEach((route) => app.route("/", route));

Deno.serve({ port: env.PORT }, app.fetch);
