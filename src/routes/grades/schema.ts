import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";
import { studentsTable } from "../students/schema.ts";
import { feesTable } from "../fees/schema.ts";
import { organizationsTable } from "../organization/schema.ts";

export const gradesTable = pgTable("grades", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  organization_id: integer("organization_id")
    .references(() => organizationsTable.id)
    .notNull(),
  updated_at: timestamp().$onUpdate(() => new Date()),
  created_at: timestamp().defaultNow().notNull(),
});

export const gradeRelations = relations(gradesTable, ({ one, many }) => ({
  organization: one(organizationsTable, {
    fields: [gradesTable.organization_id],
    references: [organizationsTable.id],
  }),
  students: many(studentsTable),
  fees: many(feesTable),
}));
