import { Hono } from "hono";
import "@std/dotenv/load";
import "./env.ts";

const app = new Hono();

app.get("/", (c) => c.text("Hello Master Shareef!"));

console.log(Deno.env.get("PORT"));

Deno.serve({ port: 5000 }, app.fetch);
