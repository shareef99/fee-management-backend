import { createInsertSchema } from "drizzle-zod";
import { academicYearsTable } from "./schema.ts";

export const createAcademicYearSchema =
  createInsertSchema(academicYearsTable).strict();

export const updateAcademicYearSchema = createAcademicYearSchema.partial();
