import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { parentsTable } from "./schema.ts";

export const createParentSchema = createInsertSchema(parentsTable).strict();

export const updateParentSchema = createUpdateSchema(parentsTable).strict();
