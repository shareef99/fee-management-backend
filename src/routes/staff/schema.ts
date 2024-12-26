import {
  serial,
  pgTable,
  integer,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";
import { organizations } from "../organization/schema.ts";
import { staffRoles } from "../../types/enums.ts";
import { relations } from "drizzle-orm/relations";

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
  updated_at: timestamp().$onUpdate(() => new Date()),
  created_at: timestamp().defaultNow().notNull(),
});

export const staffRelations = relations(staff, ({ one }) => ({
  organization: one(organizations, {
    fields: [staff.organization_id],
    references: [organizations.id],
  }),
}));
