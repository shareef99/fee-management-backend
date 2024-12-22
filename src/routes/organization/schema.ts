import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const organizations = pgTable("organization", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).unique(),
  address: varchar("address", { length: 255 }).notNull(),
  mobile: varchar("mobile", { length: 15 }).notNull(),
  updated_at: timestamp().$onUpdate(() => new Date()),
  created_at: timestamp().defaultNow().notNull(),
});
