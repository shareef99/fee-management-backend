import { zValidator } from "@hono/zod-validator";
import app from "../../app.ts";
import { db } from "../../db/index.ts";
import { eq } from "drizzle-orm";
import { organizations } from "./schema.ts";
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
      .insert(organizations)
      .values(payload)
      .returning();

    return c.json({ organization });
  }
);

organizationRouter.get("/", async (c) => {
  const organizations = await db.query.organizations.findMany();

  return c.json({
    organizations,
  });
});

organizationRouter.get("/:id", validateParamsId, async (c) => {
  const { id } = c.req.valid("param");
  const organization = await db.query.organizations.findFirst({
    where: eq(organizations.id, id),
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
      .update(organizations)
      .set(payload)
      .where(eq(organizations.id, id))
      .returning();

    return c.json({ organization });
  }
);
