import { ZodError } from "zod";

const errorFileds = (e: ZodError) => Object.keys(e.formErrors.fieldErrors);

export const ERROR = {
  INVALID_ARGUMENTS: (error: ZodError) =>
    `参数校验失败: ${errorFileds(error).join(",")}`,
  ALREADY_HAVE_THIS_NETWORK: `已经拥有该网络`,
  PLEASE_DELETE_CHILDREN_NETWORK_FIRST: "请先删除子网络",
  DELETE_DOES_NOT_EXIST: (name: string) => `删除${name}失败,${name}不存在`,
  DOES_NOT_EXIST: (name: string) => `不存在的${name}`,

  ALREADY_HAVE_THIS_DEVICE: `已经拥有该设备`,
  ALREADY_HAVE_THIS_USER: "已经拥有该用户",
};
