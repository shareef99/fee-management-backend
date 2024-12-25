import { createInsertSchema } from "drizzle-zod";
import { organizations } from "./schema.ts";

export const createOrganizationSchema =
  createInsertSchema(organizations).strict();

export const updateOrganizationSchema = createOrganizationSchema.partial();
