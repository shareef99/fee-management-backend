import {
  doublePrecision,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { feesTable } from "../fees/schema.ts";
import { parentsTable } from "../parents/schema.ts";
import { staffTable } from "../staff/schema.ts";
import { paymentMethods, paymentStatuses } from "../../types/enums.ts";
import { relations } from "drizzle-orm/relations";

export const paymentsTable = pgTable("payments", {
  id: serial("id").primaryKey(),
  fee_id: integer("fee_id")
    .notNull()
    .references(() => feesTable.id),
  parent_id: integer("parent_id")
    .notNull()
    .references(() => parentsTable.id),
  staff_id: integer("staff_id")
    .notNull()
    .references(() => staffTable.id),
  date: timestamp("date").notNull(),
  amount: doublePrecision("amount").notNull(),
  status: varchar("status", { enum: paymentStatuses }).notNull(),
  method: varchar("method", { enum: paymentMethods }).notNull(),
  remarks: varchar("remarks"),
  updated_at: timestamp().$onUpdate(() => new Date()),
  created_at: timestamp().defaultNow().notNull(),
});

export const paymentsRelations = relations(paymentsTable, ({ one }) => ({
  fee: one(feesTable, {
    fields: [paymentsTable.fee_id],
    references: [feesTable.id],
  }),
  parent: one(parentsTable, {
    fields: [paymentsTable.parent_id],
    references: [parentsTable.id],
  }),
  staff: one(staffTable, {
    fields: [paymentsTable.staff_id],
    references: [staffTable.id],
  }),
}));
