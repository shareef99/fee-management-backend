import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.text("Hello Master Shareef!"));

Deno.serve({ port: 5000 }, app.fetch);
