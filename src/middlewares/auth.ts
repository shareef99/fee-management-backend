import { bearerAuth } from "hono/bearer-auth";
import { getSignedCookie } from "hono/cookie";
import env from "../env.ts";
import { cookieKeys } from "../constants/index.ts";

export const authMiddleware = bearerAuth({
  noAuthenticationHeaderMessage: "Please provide a token",
  invalidAuthenticationHeaderMessage: "Invalid header provided",
  invalidTokenMessage: "Invalid token provided",
  async verifyToken(token, c) {
    if (!token) {
      return false;
    }

    const accessToken = await getSignedCookie(
      c,
      env.SECRET_KEY,
      cookieKeys.accessToken
    );

    return token === accessToken;
  },
});
