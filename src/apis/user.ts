import { UserInfo } from "@/types/user";
import { postData } from "./_fetch";
import { CONSTANT } from "@/lib/constant";

// login
export const login = async (req: { username: string }) => {
  const result = await postData("/login", req, CONSTANT.LOGIN_SUCCESS);

  if (result === null) {
    throw new Error("faild");
  }

  return result as { token: string; user: UserInfo };
};
