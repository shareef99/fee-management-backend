import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

export const validateParamsId = zValidator(
  "param",
  z.object({ id: z.coerce.number() })
);

export const validateQueryId = zValidator(
  "query",
  z.object({ id: z.coerce.number() })
);

export const validateBodyId = zValidator(
  "json",
  z.object({ id: z.coerce.number() })
);
