import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const gradesTable = pgTable("grades", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  updated_at: timestamp().$onUpdate(() => new Date()),
  created_at: timestamp().defaultNow().notNull(),
});
