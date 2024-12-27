import { createInsertSchema } from "drizzle-zod";
import { organizationsTable } from "./schema.ts";

export const createOrganizationSchema =
  createInsertSchema(organizationsTable).strict();

export const updateOrganizationSchema = createOrganizationSchema.partial();
