import { z } from "zod";
import { ERROR } from "../utils/error";
import { prisma } from "../db";

const CreateUserSchema = z.object({
  account: z.string(),
  password: z.string().optional(),
  username: z.string().optional(),
  avatar: z.string().optional(),
  remark: z.string().optional(),
});

type CreateUserInfo = z.infer<typeof CreateUserSchema>;

export const create_user = async (data: CreateUserInfo) => {
  const { success, error } = CreateUserSchema.safeParse(data);

  if (!success) {
    throw new Error(ERROR.INVALID_ARGUMENTS(error));
  }

  if (!(await prisma.user.findUnique({ where: { account: data.account } }))) {
    throw new Error(ERROR.ALREADY_HAVE_THIS_USER);
  }

  const newUser = await prisma.user.create({ data });

  return newUser;
};
