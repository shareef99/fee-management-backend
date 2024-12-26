import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const academicYears = pgTable("academic_year", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  start_date: timestamp("start_date").notNull(),
  end_date: timestamp("end_date").notNull(),
  updated_at: timestamp().$onUpdate(() => new Date()),
  created_at: timestamp().defaultNow().notNull(),
});
