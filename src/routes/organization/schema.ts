import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";
import { staffTable } from "../staff/schema.ts";
import { parentsTable } from "../parents/schema.ts";
import { studentsTable } from "../students/schema.ts";

export const organizationsTable = pgTable("organizations", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  mobile: varchar("mobile", { length: 15 }).notNull(),
  updated_at: timestamp().$onUpdate(() => new Date()),
  created_at: timestamp().defaultNow().notNull(),
});

export const organizationRelations = relations(
  organizationsTable,
  ({ many }) => ({
    staff: many(staffTable),
    parents: many(parentsTable),
    students: many(studentsTable),
  })
);
