import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { paymentsTable } from "./schema.ts";
import { z } from "zod";

export const createPaymentSchema = createInsertSchema(paymentsTable)
  .strict()
  .extend({
    date: z.coerce.date(),
  });
export const updatePaymentSchema = createUpdateSchema(paymentsTable).strict();
