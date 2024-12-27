import { createInsertSchema } from "drizzle-zod";
import { gradesTable } from "./schema.ts";

export const createGradeSchema = createInsertSchema(gradesTable).strict();

export const updateGradeSchema = createGradeSchema.partial();
