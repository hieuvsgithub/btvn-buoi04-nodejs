import * as z from "zod";

const productSchema = z.object({
  title: z.string().min(6),
  price: z.number().min(0),
  description: z.string().optional(),
  categoryId: z.string(),
  isHidden: z.boolean().default(false),
  deleteAt: z.string().datetime().nullable().default(null),
});

export default productSchema;
