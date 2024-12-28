import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";
import { studentsTable } from "../students/schema.ts";
import { feesTable } from "../fees/schema.ts";

export const gradesTable = pgTable("grades", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  updated_at: timestamp().$onUpdate(() => new Date()),
  created_at: timestamp().defaultNow().notNull(),
});

export const gradeRelations = relations(gradesTable, ({ many }) => ({
  students: many(studentsTable),
  fees: many(feesTable),
}));
