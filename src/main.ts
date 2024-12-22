import "@std/dotenv/load";
import "./env.ts";
import app from "./app.ts";

app.get("/", (c) => c.text("Hello Master Shareef!!!"));

Deno.serve({ port: 5000 }, app.fetch);
