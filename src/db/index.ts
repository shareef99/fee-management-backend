import "@std/dotenv/load";
import { drizzle } from "drizzle-orm/node-postgres";
import env from "../env.ts";
import { organizations } from "../routes/organization/schema.ts";
import { staff } from "../routes/staff/schema.ts";

export const db = drizzle({
  connection: env.DATABASE_URL,
  casing: "snake_case",
  schema: { organizations, staff },
});
