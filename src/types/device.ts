import { z } from "zod";

export const CreateDeviceSchema = z.object({
  name: z.string().optional(),
  serialNumber: z.string().min(1, { message: "Required" }),
  usage: z.string().optional(),
  user: z.string().optional(),
  location: z.string().optional(),
  remark: z.string().optional(),
  deviceModelId: z.number().or(z.null()).optional(),
  networkId: z.number().or(z.null()).optional(),
  ipAddressId: z.number().or(z.null()).optional(),
});

export type CreateDeviceInfo = z.infer<typeof CreateDeviceSchema>;

export const UpdateDeviceSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  serialNumber: z.string().optional(),
  usage: z.string().optional(),
  location: z.string().optional(),
  remark: z.string().optional(),
  deviceModelId: z.number().or(z.null()).optional(),
  networkId: z.number().or(z.null()).optional(),
  ipAddressId: z.number().or(z.null()).optional(),
});

export type UpdateDeviceInfo = z.infer<typeof UpdateDeviceSchema>;
