import { Prisma } from "@prisma/client";
import { z } from "zod";

export const CreateNetworkSchema = z.object({
  name: z.string().min(1, { message: "" }),
  parentId: z.number().or(z.null()).optional(),
  ipStart: z.literal("").or(z.string().ip({ message: "Invalid IP address" })),
  ipEnd: z.literal("").or(z.string().ip({ message: "Invalid IP address" })),
  gateway: z.string().optional(),
  netmask: z.string().optional(),
  vlan: z.string().optional(),
  remark: z.string().optional(),
});

export type CreateNetworkInfo = z.infer<typeof CreateNetworkSchema>;

export type NetworkInfo = Prisma.NetworkGetPayload<{
  include: {
    children: true;
    ips: true;
  };
}>;

export const UpdateNetworkSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  parentId: z.number().or(z.null()).optional(),
  ipStart: z.literal("").or(z.string().ip({ message: "Invalid IP address" })),
  ipEnd: z.literal("").or(z.string().ip({ message: "Invalid IP address" })),
  gateway: z.string().optional(),
  netmask: z.string().optional(),
  vlan: z.string().optional(),
  remark: z.string().optional(),
});

export type UpdateNetworkInfo = z.infer<typeof UpdateNetworkSchema>;

export type IpAddressInfo = Prisma.IpAddressGetPayload<{
  include: { network: true };
}>;
