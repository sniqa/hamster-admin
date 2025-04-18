import { prisma } from "@/server/db";
import { z } from "zod";
import { ERROR } from "@/server/utils/error";
import { IdInfo, IdSchema } from "./validate";
import {
  CreateDeviceModelInfo,
  CreateDeviceModelSchema,
} from "@/types/deviceModel";

// create device model
export const create_device_model = async (data: CreateDeviceModelInfo) => {
  console.log(data);

  const { success, error } = CreateDeviceModelSchema.safeParse(data);

  if (!success) {
    throw new Error(ERROR.INVALID_ARGUMENTS(error));
  }

  if (await prisma.deviceModel.findUnique({ where: { model: data.model } })) {
    throw new Error(ERROR.ALREADY_HAVE_THIS_DEVICE_MODEL);
  }

  const newDeviceModel = await prisma.deviceModel.create({
    data,
  });

  return newDeviceModel;
};

//find device model
export const find_device_model = async () => {
  return await prisma.deviceModel.findMany();
};

export const find_device_model_select = async () => {
  const result = await prisma.deviceModel.findMany();

  return result.map((item) => ({ value: item.id, label: item.model }));
};

//delete device model
export const delete_device_model = async (data: IdInfo) => {
  const { success, error } = IdSchema.safeParse(data);

  if (!success) {
    throw new Error(ERROR.INVALID_ARGUMENTS(error));
  }

  if (!(await prisma.deviceModel.findUnique({ where: { id: data.id } }))) {
    throw new Error(ERROR.DELETE_DOES_NOT_EXIST(data.id.toString()));
  }

  return await prisma.deviceModel.delete({ where: { id: data.id } });
};

// update
const UpdateDeviceModelSchema = z.object({
  id: z.number(),
  model: z.string().optional(),
  manufacturer: z.string().optional(),
  manufactureDate: z.string().date().optional(),
  shelfLife: z.string().date().optional(),
  remark: z.string().optional(),
});

type UpdateDeviceModelInfo = z.infer<typeof UpdateDeviceModelSchema>;
export const update_device_model = async (data: UpdateDeviceModelInfo) => {
  const { success, error } = UpdateDeviceModelSchema.safeParse(data);

  if (!success) {
    throw new Error(ERROR.INVALID_ARGUMENTS(error));
  }

  if (!(await prisma.deviceModel.findUnique({ where: { id: data.id } }))) {
    throw new Error(ERROR.DELETE_DOES_NOT_EXIST(data.id.toString()));
  }

  const { id, ...rest } = data;

  return await prisma.deviceModel.update({ where: { id }, data: rest });
};
