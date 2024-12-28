import { zValidator } from "@hono/zod-validator";
import app from "../../app.ts";
import { db } from "../../db/index.ts";
import { authMiddleware } from "../../middlewares/auth.ts";
import { createStudentsSchema, updateStudentsSchema } from "./validator.ts";
import { studentsTable } from "./schema.ts";
import { validateParamsId } from "../../middlewares/validators.ts";
import { HTTPException } from "hono/http-exception";
import { eq } from "drizzle-orm/expressions";

export const studentsRouter = app.basePath("/students");

studentsRouter.get("/", authMiddleware, async (c) => {
  const students = await db.query.studentsTable.findMany();

  return c.json({ students });
});

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
