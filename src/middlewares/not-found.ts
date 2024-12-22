import type { NotFoundHandler } from "hono";

export const notFound: NotFoundHandler = (c) => {
  return c.json(
    {
      message: `404 - ${c.req.path}`,
      method: c.req.method,
      path: c.req.path,
    },
    404
  );
};
