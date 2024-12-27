import "@std/dotenv/load";
import { drizzle } from "drizzle-orm/node-postgres";
import env from "../env.ts";
import {
  organizationsTable,
  organizationRelations,
} from "../routes/organization/schema.ts";
import { staffTable, staffRelations } from "../routes/staff/schema.ts";
import { parentsTable, parentsRelations } from "../routes/parents/schema.ts";
import { gradesTable } from "../routes/grades/schema.ts";
import { academicYearsTable } from "../routes/academic-year/schema.ts";

export const db = drizzle({
  connection: env.DATABASE_URL,
  casing: "snake_case",
  schema: {
    organizationsTable,
    organizationRelations,
    staffTable,
    staffRelations,
    parentsTable,
    parentsRelations,
    gradesTable,
    academicYearsTable,
  },
});
