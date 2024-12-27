import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { organizationsTable } from "../organization/schema.ts";
import { relations } from "drizzle-orm/relations";

export const parentsTable = pgTable("parents", {
  id: serial("id").primaryKey(),
  organization_id: integer("organization_id")
    .notNull()
    .references(() => organizationsTable.id),
  name: varchar("name").notNull(),
  email: varchar("email").unique().notNull(),
  mobile: varchar("mobile", { length: 15 }).notNull(),
  address: varchar("address").notNull(),
  updated_at: timestamp().$onUpdate(() => new Date()),
  created_at: timestamp().defaultNow().notNull(),
});

export const parentsRelations = relations(parentsTable, ({ one }) => ({
  organization: one(organizationsTable, {
    fields: [parentsTable.organization_id],
    references: [organizationsTable.id],
  }),
}));
