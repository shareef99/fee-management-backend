import { zValidator } from "@hono/zod-validator";
import app from "../../app.ts";
import { db } from "../../db/index.ts";
import { authMiddleware } from "../../middlewares/auth.ts";
import { createGradeSchema, updateGradeSchema } from "./validator.ts";
import { gradesTable } from "./schema.ts";
import { asc, eq } from "drizzle-orm/expressions";
import { validateParamsId } from "../../middlewares/validators.ts";
import { HTTPException } from "hono/http-exception";

export const gradesRouter = app.basePath("/grades");

gradesRouter.get("/", authMiddleware, async (c) => {
  const grades = await db.query.gradesTable.findMany({
    orderBy: [asc(gradesTable.id)],
  });

  return c.json({ grades });
});

gradesRouter.post(
  "/",
  authMiddleware,
  zValidator("json", createGradeSchema),
  async (c) => {
    const payload = c.req.valid("json");

    const [grade] = await db.insert(gradesTable).values(payload).returning();

    return c.json({ grade });
  }
);

gradesRouter.put(
  "/:id",
  authMiddleware,
  validateParamsId,
  zValidator("json", updateGradeSchema),
  async (c) => {
    const { id } = c.req.valid("param");
    const payload = c.req.valid("json");

    const existingGrade = await db.query.gradesTable.findFirst({
      where: eq(gradesTable.id, id),
    });

    if (!existingGrade) {
      throw new HTTPException(400, {
        message: "Grade not found",
      });
    }

    const [grade] = await db
      .update(gradesTable)
      .set(payload)
      .where(eq(gradesTable.id, id))
      .returning();

    return c.json({ grade });
  }
);

gradesRouter.get("/:id", authMiddleware, validateParamsId, async (c) => {
  const { id } = c.req.valid("param");

  const grade = await db.query.gradesTable.findFirst({
    where: eq(gradesTable.id, id),
  });

  if (!grade) {
    throw new HTTPException(400, {
      message: "Grade not found",
    });
  }

  return c.json({ grade });
});
