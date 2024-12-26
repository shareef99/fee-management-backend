import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const grades = pgTable("grades", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
});
