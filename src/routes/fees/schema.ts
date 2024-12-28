import { doublePrecision, integer, pgTable, serial } from "drizzle-orm/pg-core";
import { studentsTable } from "../students/schema.ts";
import { parentsTable } from "../parents/schema.ts";
import { gradesTable } from "../grades/schema.ts";
import { academicYearsTable } from "../academic-year/schema.ts";
import { relations } from "drizzle-orm/relations";

export const feesTable = pgTable("fees", {
  id: serial("id").primaryKey(),
  student_id: integer("student_id")
    .notNull()
    .references(() => studentsTable.id),
  parent_id: integer("parent_id")
    .notNull()
    .references(() => parentsTable.id),
  grade_id: integer("grade_id")
    .notNull()
    .references(() => gradesTable.id),
  academic_year_id: integer("academic_year_id")
    .notNull()
    .references(() => academicYearsTable.id),
  fee_amount: doublePrecision("fee_amount").notNull(),
  discount: doublePrecision("discount").notNull().default(0),
  due_amount: doublePrecision("due_amount").notNull(),
  paid: doublePrecision("paid").notNull().default(0),
});

export const feesRelations = relations(feesTable, ({ one }) => ({
  student: one(studentsTable, {
    fields: [feesTable.student_id],
    references: [studentsTable.id],
  }),
  parent: one(parentsTable, {
    fields: [feesTable.parent_id],
    references: [parentsTable.id],
  }),
  grade: one(gradesTable, {
    fields: [feesTable.grade_id],
    references: [gradesTable.id],
  }),
  academic_year: one(academicYearsTable, {
    fields: [feesTable.academic_year_id],
    references: [academicYearsTable.id],
  }),
}));
