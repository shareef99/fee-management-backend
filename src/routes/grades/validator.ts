import { createInsertSchema } from "drizzle-zod";
import { grades } from "./schema.ts";

export const createGradeSchema = createInsertSchema(grades).strict();

export const updateGradeSchema = createGradeSchema.partial();
