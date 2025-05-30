import { zValidator } from "@hono/zod-validator";
import app from "../../app.ts";
import { db } from "../../db/index.ts";
import { authMiddleware } from "../../middlewares/auth.ts";
import { academicYearsTable } from "./schema.ts";
import {
  createAcademicYearSchema,
  updateAcademicYearSchema,
} from "./validator.ts";
import { validateParamsId } from "../../middlewares/validators.ts";
import { desc, eq } from "drizzle-orm/expressions";
import { HTTPException } from "hono/http-exception";

export const academicYearRouter = app.basePath("/academic-years");

academicYearRouter.get("/", authMiddleware, async (c) => {
  const academicYears = await db.query.academicYearsTable.findMany({
    orderBy: [desc(academicYearsTable.end_date)],
  });

  return c.json({ academic_years: academicYears });
});

academicYearRouter.post(
  "/",
  authMiddleware,
  zValidator("json", createAcademicYearSchema),
  async (c) => {
    const payload = c.req.valid("json");

    const [academicYear] = await db
      .insert(academicYearsTable)
      .values(payload)
      .returning();

    return c.json({ academic_year: academicYear });
  }
);

academicYearRouter.get("/:id", authMiddleware, validateParamsId, async (c) => {
  const { id } = c.req.valid("param");

  const academicYear = await db.query.academicYearsTable.findFirst({
    where: eq(academicYearsTable.id, id),
  });

  if (!academicYear) {
    throw new HTTPException(404, {
      message: "Academic year not found",
    });
  }

  return c.json({ academic_year: academicYear });
});

academicYearRouter.put(
  "/:id",
  authMiddleware,
  validateParamsId,
  zValidator("json", updateAcademicYearSchema),
  async (c) => {
    const { id } = c.req.valid("param");
    const payload = c.req.valid("json");

    const existingAcademicYear = await db.query.academicYearsTable.findFirst({
      where: eq(academicYearsTable.id, id),
    });

    if (!existingAcademicYear) {
      throw new HTTPException(404, {
        message: "Academic year not found",
      });
    }

    const [academicYear] = await db
      .update(academicYearsTable)
      .set(payload)
      .where(eq(academicYearsTable.id, id))
      .returning();

    return c.json({ academic_year: academicYear });
  }
);
