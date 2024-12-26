import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { organizations } from "../organization/schema.ts";
import { relations } from "drizzle-orm/relations";

export const parents = pgTable("parents", {
  id: serial("id").primaryKey(),
  organization_id: integer("organization_id")
    .notNull()
    .references(() => organizations.id),
  name: varchar("name").notNull(),
  email: varchar("email").unique().notNull(),
  mobile: varchar("mobile", { length: 15 }).notNull(),
  address: varchar("address").notNull(),
  updated_at: timestamp().$onUpdate(() => new Date()),
  created_at: timestamp().defaultNow().notNull(),
});

export const parentsRelations = relations(parents, ({ one }) => ({
  organization: one(organizations, {
    fields: [parents.organization_id],
    references: [organizations.id],
  }),
}));
