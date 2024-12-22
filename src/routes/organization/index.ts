import app from "../../app.ts";

export const organizationRouter = app.basePath("/organization");

organizationRouter.get("/", (c) => {
  return c.json({
    message: "Welcome to the organization route from router",
    path: c.req.path,
  });
});
