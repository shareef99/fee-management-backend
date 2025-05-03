import { getSignedCookie } from "hono/cookie";
import env from "../env.ts";
import { cookieKeys } from "../constants/index.ts";
import { MiddlewareHandler } from "hono/types";
import { HTTPException } from "hono/http-exception";
import { decode, verify } from "hono/jwt";
import { TokenPayload } from "../types/app.ts";

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const token = await getSignedCookie(
    c,
    env.SECRET_KEY,
    cookieKeys.accessToken
  );

  if (!token) {
    throw new HTTPException(401, { message: "No token found in cookies" });
  }

  try {
    await verify(token, env.SECRET_KEY);
    const decoded = decode(token).payload as TokenPayload;

    c.set("organization_id", decoded.organization_id);
    c.set("staff_id", decoded.id);
    c.set("role", decoded.role);
    await next();
  } catch (_error) {
    throw new HTTPException(401, { message: "Invalid token" });
  }
};
