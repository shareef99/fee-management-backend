import { createInsertSchema } from "drizzle-zod";
import { academicYears } from "./schema.ts";

export const createAcademicYearSchema =
  createInsertSchema(academicYears).strict();

export const updateAcademicYearSchema = createAcademicYearSchema.partial();
