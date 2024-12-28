import { zValidator } from "@hono/zod-validator";
import app from "../../app.ts";
import { authMiddleware } from "../../middlewares/auth.ts";
import { db } from "../../db/index.ts";
import { createPaymentSchema } from "./validator.ts";
import { paymentsTable } from "./schema.ts";
import { eq } from "drizzle-orm/expressions";
import { feesTable } from "../fees/schema.ts";
import { HTTPException } from "hono/http-exception";
import { validateParamsId } from "../../middlewares/validators.ts";

export const paymentsRouter = app.basePath("/payments");

paymentsRouter.get("/", authMiddleware, async (c) => {
  const payments = await db.query.paymentsTable.findMany();

  return c.json({ payments });
});

paymentsRouter.post(
  "/",
  authMiddleware,
  zValidator("json", createPaymentSchema),
  async (c) => {
    const payload = c.req.valid("json");

    const fee = await db.query.feesTable.findFirst({
      where: eq(feesTable.id, payload.fee_id),
    });

    if (!fee) {
      throw new HTTPException(400, {
        message: "Invalid fee id",
      });
    }

    if (payload.amount > fee.due_amount) {
      throw new HTTPException(400, {
        message: "Payment amount is greater than due amount",
      });
    }

    await db
      .update(feesTable)
      .set({
        paid: fee.paid + payload.amount,
        due_amount: fee.due_amount - payload.amount,
      })
      .where(eq(feesTable.id, payload.fee_id));

    const [payment] = await db
      .insert(paymentsTable)
      .values(payload)
      .returning();

    return c.json({ payment });
  }
);

paymentsRouter.get("/:id", authMiddleware, validateParamsId, async (c) => {
  const { id } = c.req.valid("param");

  const payment = await db.query.paymentsTable.findFirst({
    where: eq(paymentsTable.id, id),
  });

  if (!payment) {
    throw new HTTPException(400, {
      message: "Payment not found",
    });
  }

  return c.json({ payment });
});
