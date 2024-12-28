import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { feesTable } from "./schema.ts";

export const createFeesSchema = createInsertSchema(feesTable).strict().omit({
  due_amount: true,
});
export const updateFeesSchema = createUpdateSchema(feesTable).strict();
