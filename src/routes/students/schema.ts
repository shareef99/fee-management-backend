import {
  boolean,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { organizationsTable } from "../organization/schema.ts";
import { parentsTable } from "../parents/schema.ts";
import { gradesTable } from "../grades/schema.ts";
import { academicYearsTable } from "../academic-year/schema.ts";
import { genders } from "../../types/enums.ts";
import { relations } from "drizzle-orm/relations";
import { feesTable } from "../fees/schema.ts";

export const studentsTable = pgTable("students", {
  id: serial("id").primaryKey(),
  organization_id: integer("organization_id")
    .notNull()
    .references(() => organizationsTable.id),
  parent_id: integer("parent_id")
    .notNull()
    .references(() => parentsTable.id),
  grade_id: integer("grade_id")
    .notNull()
    .references(() => gradesTable.id),
  academic_year_id: integer("academic_year_id")
    .notNull()
    .references(() => academicYearsTable.id),
  name: varchar("name").notNull(),
  email: varchar("email").unique().notNull(),
  mobile: varchar("mobile", { length: 15 }).unique(),
  dob: varchar("dob"),
  gender: varchar("gender", { enum: genders }),
  is_active: boolean("is_active").notNull().default(true),
  updated_at: timestamp().$onUpdate(() => new Date()),
  created_at: timestamp().defaultNow().notNull(),
});

export const studentsRelations = relations(studentsTable, ({ one, many }) => ({
  organization: one(organizationsTable, {
    fields: [studentsTable.organization_id],
    references: [organizationsTable.id],
  }),
  parent: one(parentsTable, {
    fields: [studentsTable.parent_id],
    references: [parentsTable.id],
  }),
  grade: one(gradesTable, {
    fields: [studentsTable.grade_id],
    references: [gradesTable.id],
  }),
  academic_year: one(academicYearsTable, {
    fields: [studentsTable.academic_year_id],
    references: [academicYearsTable.id],
  }),
  fees: many(feesTable),
}));
