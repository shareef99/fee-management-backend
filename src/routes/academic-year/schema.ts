import {
  boolean,
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

export const academicYearsTable = pgTable("academic_year", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  start_date: timestamp("start_date").notNull(),
  end_date: timestamp("end_date").notNull(),
  organization_id: integer("organization_id")
    .references(() => organizationsTable.id)
    .notNull(),
  is_current_year: boolean("is_current_year").notNull().default(false),
  updated_at: timestamp().$onUpdate(() => new Date()),
  created_at: timestamp().defaultNow().notNull(),
});

export const academicYearsRelations = relations(
  academicYearsTable,
  ({ one, many }) => ({
    organization: one(organizationsTable, {
      fields: [academicYearsTable.organization_id],
      references: [organizationsTable.id],
    }),
    students: many(studentsTable),
    fees: many(feesTable),
  })
);
