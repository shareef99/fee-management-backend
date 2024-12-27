import { zValidator } from "@hono/zod-validator";
import app from "../../app.ts";
import { db } from "../../db/index.ts";
import { eq } from "drizzle-orm";
import { organizationsTable } from "./schema.ts";
import {
  createOrganizationSchema,
  updateOrganizationSchema,
} from "./validator.ts";
import { validateParamsId } from "../../middlewares/validators.ts";
import { HTTPException } from "hono/http-exception";

export const organizationRouter = app.basePath("/organizations");

organizationRouter.post(
  "/",
  zValidator("json", createOrganizationSchema),
  async (c) => {
    const payload = c.req.valid("json");

    const [organization] = await db
      .insert(organizationsTable)
      .values(payload)
      .returning();

    return c.json({ organization });
  }
);

organizationRouter.get("/", async (c) => {
  const organizations = await db.query.organizationsTable.findMany();

  return c.json({
    organizations,
  });
});

organizationRouter.get("/:id", validateParamsId, async (c) => {
  const { id } = c.req.valid("param");
  const organization = await db.query.organizationsTable.findFirst({
    where: eq(organizationsTable.id, id),
  });

  if (!organization) {
    throw new HTTPException(400, {
      message: "Organization not found",
    });
  }

  return c.json({
    organization: organization,
  });
});

organizationRouter.put(
  "/:id",
  validateParamsId,
  zValidator("json", updateOrganizationSchema),
  async (c) => {
    const { id } = c.req.valid("param");
    const payload = c.req.valid("json");

    const [organization] = await db
      .update(organizationsTable)
      .set(payload)
      .where(eq(organizationsTable.id, id))
      .returning();

    return c.json({ organization });
  }
);
