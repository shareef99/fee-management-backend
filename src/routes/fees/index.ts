import { zValidator } from "@hono/zod-validator";
import app from "../../app.ts";
import { authMiddleware } from "../../middlewares/auth.ts";
import { createFeesSchema, updateFeesSchema } from "./validator.ts";
import { db } from "../../db/index.ts";
import { feesTable } from "./schema.ts";
import { validateParamsId } from "../../middlewares/validators.ts";
import { eq } from "drizzle-orm/expressions";
import { HTTPException } from "hono/http-exception";

export const feesRouter = app.basePath("/fees");

feesRouter.get("/", authMiddleware, async (c) => {
  const fees = await db.query.feesTable.findMany();

  return c.json({ fees });
});

feesRouter.post(
  "/",
  authMiddleware,
  zValidator("json", createFeesSchema),
  async (c) => {
    const payload = c.req.valid("json");

    const dueAmount =
      payload.fee_amount - (payload.discount || 0) - (payload.paid || 0);

    const [fee] = await db
      .insert(feesTable)
      .values({
        ...payload,
        due_amount: dueAmount,
      })
      .returning();

    return c.json({ fee });
  }
);

feesRouter.get("/:id", authMiddleware, validateParamsId, async (c) => {
  const { id } = c.req.valid("param");

  const fee = await db.query.feesTable.findFirst({
    where: eq(feesTable.id, id),
  });

  if (!fee) {
    throw new HTTPException(400, {
      message: "Fee not found",
    });
  }

  return c.json({ fee });
});

feesRouter.put(
  "/:id",
  authMiddleware,
  validateParamsId,
  zValidator("json", updateFeesSchema),
  async (c) => {
    const { id } = c.req.valid("param");
    const payload = c.req.valid("json");

    const existingFee = await db.query.feesTable.findFirst({
      where: eq(feesTable.id, id),
    });

    if (!existingFee) {
      throw new HTTPException(400, {
        message: "Fee not found",
      });
    }

    const [fee] = await db
      .update(feesTable)
      .set(payload)
      .where(eq(feesTable.id, id))
      .returning();

    return c.json({ fee });
  }
);
