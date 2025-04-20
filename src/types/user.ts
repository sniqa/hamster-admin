import { Prisma } from "@prisma/client";
import { z } from "zod";

export const LoginSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Required" })
    .max(12, { message: "More than 12 characters" }),
  password: z
    .string()
    .min(5, { message: "Required" })
    .max(16, { message: "More than 16 characters" }),
});

export type LoginInfo = z.infer<typeof LoginSchema>;

export type UserInfo = Prisma.UserGetPayload<{
  omit: { password: true };
}>;
