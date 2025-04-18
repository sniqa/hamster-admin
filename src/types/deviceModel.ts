import { z } from "zod";

export const CreateDeviceModelSchema = z.object({
  model: z.string().min(1, { message: "Must have 1 charcalter" }),
  manufacturer: z.string().optional(),
  manufactureDate: z.string().optional(),
  shelfLife: z.string().optional(),
  category: z.string().optional(),
  remark: z.string().optional(),
});
export type CreateDeviceModelInfo = z.infer<typeof CreateDeviceModelSchema>;
