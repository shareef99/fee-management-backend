import "@std/dotenv/load";
import { drizzle } from "drizzle-orm/node-postgres";
import env from "../env.ts";
import {
  organizations,
  organizationRelations,
} from "../routes/organization/schema.ts";
import { staff, staffRelations } from "../routes/staff/schema.ts";
import { parents, parentsRelations } from "../routes/parents/schema.ts";
import { grades } from "../routes/grades/schema.ts";

export const db = drizzle({
  connection: env.DATABASE_URL,
  casing: "snake_case",
  schema: {
    organizations,
    organizationRelations,
    staff,
    staffRelations,
    parents,
    parentsRelations,
    grades,
  },
});
