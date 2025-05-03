import { zValidator } from "@hono/zod-validator";
import app from "../../app.ts";
import { db } from "../../db/index.ts";
import { authMiddleware } from "../../middlewares/auth.ts";
import { createStudentsSchema, updateStudentsSchema } from "./validator.ts";
import { studentsTable } from "./schema.ts";
import { validateParamsId } from "../../middlewares/validators.ts";
import { HTTPException } from "hono/http-exception";
import { and, eq } from "drizzle-orm/expressions";
import { z } from "zod";
import { academicYearsTable } from "../academic-year/schema.ts";

export const studentsRouter = app.basePath("/students");

studentsRouter.get(
  "/",
  authMiddleware,
  zValidator(
    "query",
    z.object({
      academic_year_id: z.coerce.number().optional(),
      grade_id: z.coerce.number().optional(),
    })
  ),
  async (c) => {
    let { academic_year_id, grade_id } = c.req.valid("query");
    const { organization_id } = c.var;

    if (!academic_year_id) {
      const activeAcademicYear = await db.query.academicYearsTable.findFirst({
        where: and(
          eq(academicYearsTable.is_current_year, true),
          eq(academicYearsTable.organization_id, organization_id)
        ),
      });

      if (!activeAcademicYear) {
        throw new HTTPException(404, {
          message: "Academic year not found",
        });
      }

      academic_year_id = activeAcademicYear.id;
    }

    const where = [
      eq(studentsTable.organization_id, organization_id),
      eq(studentsTable.academic_year_id, academic_year_id),
    ];

    if (grade_id) {
      where.push(eq(studentsTable.grade_id, grade_id));
    }

    const students = await db.query.studentsTable.findMany({
      with: {
        parent: true,
      },
      where: and(...where),
    });

    return c.json({ students });
  }
);

studentsRouter.post(
  "/",
  authMiddleware,
  zValidator("json", createStudentsSchema),
  async (c) => {
    const payload = c.req.valid("json");

    const [student] = await db
      .insert(studentsTable)
      .values(payload)
      .returning();

    return c.json({ student });
  }
);

studentsRouter.get("/:id", authMiddleware, validateParamsId, async (c) => {
  const { id } = c.req.valid("param");

  const student = await db.query.studentsTable.findFirst({
    where: eq(studentsTable.id, id),
    with: {
      grade: true,
      academic_year: true,
      parent: true,
      fees: true,
    },
  });

  if (!student) {
    throw new HTTPException(400, { message: "Student not found" });
  }

  return c.json({ student });
});

studentsRouter.put(
  "/:id",
  authMiddleware,
  validateParamsId,
  zValidator("json", updateStudentsSchema),
  async (c) => {
    const { id } = c.req.valid("param");
    const payload = c.req.valid("json");

    const existingStudent = await db.query.studentsTable.findFirst({
      where: eq(studentsTable.id, id),
    });

    if (!existingStudent) {
      throw new HTTPException(400, {
        message: "Student not found",
      });
    }

    const [student] = await db
      .update(studentsTable)
      .set(payload)
      .where(eq(studentsTable.id, id))
      .returning();

    return c.json({ student });
  }
);
