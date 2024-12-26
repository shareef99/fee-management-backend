import { createInsertSchema } from "drizzle-zod";
import { staff } from "./schema.ts";

export const createStaffSchema = createInsertSchema(staff).strict();

export const updateStaffSchema = createStaffSchema
  .partial()
  .omit({ password: true });

export const loginStaffSchema = createStaffSchema.pick({
  email: true,
  password: true,
});
