import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { academicYearsTable } from "./schema.ts";
import { z } from "zod";

export const createAcademicYearSchema = createInsertSchema(academicYearsTable)
  .extend({
    start_date: z.coerce.date(),
    end_date: z.coerce.date(),
  })
  .strict()
  .superRefine((data, ctx) => {
    if (data.start_date > data.end_date) {
      ctx.addIssue({
        code: "custom",
        message: "Start date must be before end date",
        path: ["start_date"],
        fatal: true,
        params: undefined,
      });
    }

    return data;
  });

export const updateAcademicYearSchema = createUpdateSchema(academicYearsTable)
  .extend({
    start_date: z.coerce.date().optional(),
    end_date: z.coerce.date().optional(),
  })
  .strict();
