import { z, ZodError } from "zod";

const EnvSchema = z.object({
  ENVIRONMENT: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(5000),
});
type Env = z.infer<typeof EnvSchema>;

let env: Env;

try {
  env = EnvSchema.parse(Deno.env.toObject());
} catch (e) {
  const error = e as ZodError;
  console.error("Invalid env file");
  console.error(error.flatten().fieldErrors);
  Deno.exit(1);
}

export default env;