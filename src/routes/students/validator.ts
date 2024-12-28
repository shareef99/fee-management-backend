import { createInsertSchema } from "drizzle-zod";
import { studentsTable } from "./schema.ts";

export const createStudentsSchema = createInsertSchema(studentsTable).strict();

export const updateStudentsSchema = createStudentsSchema.partial();
