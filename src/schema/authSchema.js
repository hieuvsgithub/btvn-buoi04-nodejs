import * as z from "zod";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "toi thieu 6 ki tu"),
  username: z.string().min(2, "toi thieu 2 ki tu"),
  role: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "toi thieu 6 ki tu"),
});

export { registerSchema, loginSchema };
