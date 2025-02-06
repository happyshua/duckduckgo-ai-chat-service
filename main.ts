import { Hono } from "jsr:@hono/hono";
import { cors } from "jsr:@hono/cors@1.0.0";

import { chat } from "./src/api/chat.ts";
import { models } from "./src/api/models.ts";

import { auth } from "./src/auth.ts";
import { limit } from "./src/limit.ts";
import { cron } from "./src/cron.ts";

const app = new Hono();

app.use('/*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true
}));

auth(app);
limit(app);

chat(app);
models(app);

cron();

Deno.serve(app.fetch);
