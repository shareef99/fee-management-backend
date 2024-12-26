import { zValidator } from "@hono/zod-validator";
import app from "../../app.ts";
import { db } from "../../db/index.ts";
import {
  createStaffSchema,
  loginStaffSchema,
  updateStaffSchema,
} from "./validator.ts";
import { eq } from "drizzle-orm";
import { staff } from "./schema.ts";
import { HTTPException } from "hono/http-exception";
import { sign } from "hono/jwt";
import { setSignedCookie } from "hono/cookie";
import { hashPassword, verifyPassword } from "../../helpers/index.ts";
import env from "../../env.ts";
import { cookieKeys } from "../../constants/index.ts";
import { validateParamsId } from "../../middlewares/validators.ts";
import { authMiddleware } from "../../middlewares/auth.ts";

export const staffRouter = app.basePath("/staff");

staffRouter.get("/", authMiddleware, async (c) => {
  const staffs = await db.query.staff.findMany({
    columns: { password: false },
  });

  return c.json({ staffs });
});

staffRouter.post(
  "/signup",
  zValidator("json", createStaffSchema),
  async (c) => {
    const payload = c.req.valid("json");

    const existingStaff = await db.query.staff.findMany({
      where: eq(staff.email, payload.email),
    });

    if (existingStaff.length > 0) {
      throw new HTTPException(400, {
        message: "Staff already exists with this email",
      });
    }

    const hashedPassword = await hashPassword(payload.password);

    const [createdStaff] = await db
      .insert(staff)
      .values({ ...payload, password: hashedPassword })
      .returning();
    const { password: _, ...staffWithOutPassword } = createdStaff;

    const tokenPayload = {
      id: createdStaff.id,
      name: payload.name,
      email: payload.email,
    };
    const accessToken = await sign(tokenPayload, env.SECRET_KEY);
    const refreshToken = await sign(tokenPayload, env.REFRESH_SECRET_KEY);

    await setSignedCookie(
      c,
      cookieKeys.accessToken,
      accessToken,
      env.SECRET_KEY,
      {
        httpOnly: true,
        expires: new Date(
          Date.now() + env.TOKEN_EXPIRATION_MINUTES * 60 * 1000
        ),
      }
    );

    await setSignedCookie(
      c,
      cookieKeys.refreshToken,
      refreshToken,
      env.REFRESH_SECRET_KEY,
      {
        httpOnly: true,
        expires: new Date(
          Date.now() + env.TOKEN_EXPIRATION_MINUTES * 60 * 1000 * 24
        ),
      }
    );

    return c.json({ staff: staffWithOutPassword, accessToken, refreshToken });
  }
);

staffRouter.post("/signin", zValidator("json", loginStaffSchema), async (c) => {
  const payload = c.req.valid("json");

  const existingStaff = await db.query.staff.findFirst({
    where: eq(staff.email, payload.email),
  });

  if (!existingStaff) {
    throw new HTTPException(401, {
      message: "Invalid email",
    });
  }

  const isPasswordValid = await verifyPassword(
    payload.password,
    existingStaff.password
  );

  if (!isPasswordValid) {
    throw new HTTPException(401, {
      message: "Invalid password",
    });
  }

  const tokenPayload = {
    id: existingStaff.id,
    name: existingStaff.name,
    email: existingStaff.email,
  };
  const accessToken = await sign(tokenPayload, env.SECRET_KEY);
  const refreshToken = await sign(tokenPayload, env.REFRESH_SECRET_KEY);

  await setSignedCookie(
    c,
    cookieKeys.accessToken,
    accessToken,
    env.SECRET_KEY,
    {
      httpOnly: true,
      expires: new Date(Date.now() + env.TOKEN_EXPIRATION_MINUTES * 60 * 1000),
    }
  );

  await setSignedCookie(
    c,
    cookieKeys.refreshToken,
    refreshToken,
    env.REFRESH_SECRET_KEY,
    {
      httpOnly: true,
      expires: new Date(
        Date.now() + env.TOKEN_EXPIRATION_MINUTES * 60 * 1000 * 24
      ),
    }
  );

  const { password: _, ...staffWithoutPassword } = existingStaff;
  return c.json({ staff: staffWithoutPassword, accessToken, refreshToken });
});

staffRouter.put(
  "/:id",
  authMiddleware,
  validateParamsId,
  zValidator("json", updateStaffSchema),
  async (c) => {
    const { id } = c.req.valid("param");
    const payload = c.req.valid("json");

    const existingStaff = await db.query.staff.findFirst({
      where: eq(staff.id, id),
    });

    if (!existingStaff) {
      throw new HTTPException(404, {
        message: "Staff not found",
      });
    }

    const [updatedStaff] = await db
      .update(staff)
      .set(payload)
      .where(eq(staff.id, id))
      .returning();

    const { password: _, ...staffWithoutPassword } = updatedStaff;

    return c.json({ staff: staffWithoutPassword });
  }
);

staffRouter.get("/:id", authMiddleware, validateParamsId, async (c) => {
  const { id } = c.req.valid("param");

  const staffById = await db.query.staff.findFirst({
    where: eq(staff.id, id),
    columns: { password: false },
  });

  if (!staffById) {
    throw new HTTPException(400, {
      message: "Staff not found",
    });
  }

  return c.json({ staff: staffById });
});
