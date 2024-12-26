import { createInsertSchema } from "drizzle-zod";
import { parents } from "./schema.ts";

export const createParentSchema = createInsertSchema(parents).strict();

export const updateParentSchema = createParentSchema.partial();
