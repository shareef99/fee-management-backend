import { createInsertSchema } from "drizzle-zod";
import { staffTable } from "./schema.ts";

export const createStaffSchema = createInsertSchema(staffTable).strict();

export const updateStaffSchema = createStaffSchema
  .partial()
  .omit({ password: true });

export const loginStaffSchema = createStaffSchema.pick({
  email: true,
  password: true,
});
