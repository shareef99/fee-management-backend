import { createInsertSchema } from "drizzle-zod";
import { grades } from "./schema.ts";

export const createParentSchema = createInsertSchema(grades).strict();

export const updateParentSchema = createParentSchema.partial();
