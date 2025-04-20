import { z } from "zod";
import { ERROR } from "../utils/error";
import { prisma } from "../db";
import { LoginInfo, LoginSchema } from "@/types/user";
import { compare, hash } from "@/server/utils/hash";

//login
export const login = async (data: LoginInfo) => {
  const { success, error } = LoginSchema.safeParse(data);

  if (!success) {
    throw new Error(ERROR.INVALID_ARGUMENTS(error));
  }

  const user = await prisma.user.findUnique({
    where: { account: data.username },
  });

  if (!user) {
    throw new Error(ERROR.ERROR_ACCOUNT_OR_PASSWORD);
  } else {
    if (!compare(data.password, user.password)) {
      throw new Error(ERROR.ERROR_ACCOUNT_OR_PASSWORD);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...rest } = user;

  return rest;
};

// create
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

  console.log(
    await prisma.user.findUnique({ where: { account: data.account } })
  );

  if (await prisma.user.findUnique({ where: { account: data.account } })) {
    throw new Error(ERROR.ALREADY_HAVE_THIS_USER);
  }

  data.password = hash(data.password!);

  const newUser = await prisma.user.create({ data, omit: { password: true } });

  return newUser;
};
