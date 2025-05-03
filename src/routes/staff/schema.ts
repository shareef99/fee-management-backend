import {
  serial,
  pgTable,
  integer,
  varchar,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { organizationsTable } from "../organization/schema.ts";
import { staffRoles } from "../../types/enums.ts";
import { relations } from "drizzle-orm/relations";
import { paymentsTable } from "../payments/schema.ts";

export const staffTable = pgTable("staff", {
  id: serial("id").primaryKey(),
  organization_id: integer("organization_id")
    .references(() => organizationsTable.id)
    .notNull(),
  name: varchar("name").notNull(),
  email: varchar("email").unique().notNull(),
  role: varchar("role", { enum: staffRoles }).notNull(),
  mobile: varchar("mobile", { length: 15 }).notNull(),
  password: varchar("password").notNull(),
  is_active: boolean("is_active").default(true).notNull(),
  updated_at: timestamp().$onUpdate(() => new Date()),
  created_at: timestamp().defaultNow().notNull(),
});

export const staffRelations = relations(staffTable, ({ one, many }) => ({
  organization: one(organizationsTable, {
    fields: [staffTable.organization_id],
    references: [organizationsTable.id],
  }),
  payments: many(paymentsTable),
}));
