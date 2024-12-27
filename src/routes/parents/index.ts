import { zValidator } from "@hono/zod-validator";
import app from "../../app.ts";
import { db } from "../../db/index.ts";
import { authMiddleware } from "../../middlewares/auth.ts";
import { createParentSchema, updateParentSchema } from "./validator.ts";
import { parentsTable } from "./schema.ts";
import { eq } from "drizzle-orm/expressions";
import { validateParamsId } from "../../middlewares/validators.ts";
import { HTTPException } from "hono/http-exception";

export const parentsRouter = app.basePath("/parents");

parentsRouter.get("/", authMiddleware, async (c) => {
  const parents = await db.query.parentsTable.findMany();

  return c.json({ parents });
});

parentsRouter.post(
  "/",
  authMiddleware,
  zValidator("json", createParentSchema),
  async (c) => {
    const payload = c.req.valid("json");

    const [parent] = await db.insert(parentsTable).values(payload).returning();

    return c.json({ parent });
  }
);

parentsRouter.get("/:id", authMiddleware, validateParamsId, async (c) => {
  const { id } = c.req.valid("param");

  const parent = await db.query.parentsTable.findFirst({
    where: eq(parentsTable.id, id),
  });

  if (!parent) {
    throw new HTTPException(400, {
      message: "Parent not found",
    });
  }

  return c.json({ parent });
});

parentsRouter.put(
  "/:id",
  authMiddleware,
  validateParamsId,
  zValidator("json", updateParentSchema),
  async (c) => {
    const { id } = c.req.valid("param");
    const payload = c.req.valid("json");

    const existingParent = await db.query.parentsTable.findFirst({
      where: eq(parentsTable.id, id),
    });

    if (!existingParent) {
      throw new HTTPException(400, {
        message: "Parent not found",
      });
    }

    const [parent] = await db
      .update(parentsTable)
      .set(payload)
      .where(eq(parentsTable.id, id))
      .returning();

    return c.json({ parent });
  }
);
