import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";
import { studentsTable } from "../students/schema.ts";
import { feesTable } from "../fees/schema.ts";

export const academicYearsTable = pgTable("academic_year", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  start_date: timestamp("start_date").notNull(),
  end_date: timestamp("end_date").notNull(),
  updated_at: timestamp().$onUpdate(() => new Date()),
  created_at: timestamp().defaultNow().notNull(),
});

export const academicYearsRelations = relations(
  academicYearsTable,
  ({ many }) => ({
    students: many(studentsTable),
    fees: many(feesTable),
  })
);
