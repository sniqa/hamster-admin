import { z } from "zod";

export const IdSchema = z.object({
  id: z.number(),
});
export type IdInfo = z.infer<typeof IdSchema>;
