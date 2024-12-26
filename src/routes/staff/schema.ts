import { serial, pgTable, integer, varchar } from "drizzle-orm/pg-core";
import { organizations } from "../organization/schema.ts";
import { staffRoles } from "../../types/enums.ts";

export const staff = pgTable("staff", {
  id: serial("id").primaryKey(),
  organization_id: integer("organization_id").references(
    () => organizations.id
  ),
  name: varchar("name").notNull(),
  email: varchar("email").unique().notNull(),
  role: varchar("role", { enum: staffRoles }).notNull(),
  mobile: varchar("mobile", { length: 15 }).notNull(),
  password: varchar("password").notNull(),
});
