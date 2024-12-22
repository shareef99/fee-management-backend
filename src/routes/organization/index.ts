import app from "../../app.ts";
import { db } from "../../db/index.ts";

export const organizationRouter = app.basePath("/organization");

organizationRouter.get("/", async (c) => {
  const organizations = await db.query.organizations.findMany();

  return c.json({
    message: "Welcome to the organization route from router",
    path: c.req.path,
    organizations,
  });
});
