import { createInsertSchema } from "drizzle-zod";
import { parentsTable } from "./schema.ts";

export const createParentSchema = createInsertSchema(parentsTable).strict();

export const updateParentSchema = createParentSchema.partial();
