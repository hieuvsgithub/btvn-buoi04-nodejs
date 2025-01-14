import * as z from "zod";

const categorySchema = z.object({
  title: z.string().min(2, "toi thieu 2 ki tu"),
  description: z.string(),
  isHidden: z.boolean().default(false),
  deleteAt: z.string().datetime().nullable().default(null),
});

export default categorySchema;
