import { getSignedCookie } from "hono/cookie";
import env from "../env.ts";
import { cookieKeys } from "../constants/index.ts";
import { MiddlewareHandler } from "hono/types";
import { HTTPException } from "hono/http-exception";
import { verify } from "hono/jwt";

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
    await next();
  } catch (_error) {
    throw new HTTPException(401, { message: "Invalid token" });
  }
};
