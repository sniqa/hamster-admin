import { prisma } from "@/server/db";
import { ERROR } from "@/server/utils/error";
import { IdInfo, IdSchema } from "./validate";
import {
  CreateDeviceInfo,
  CreateDeviceSchema,
  UpdateDeviceInfo,
  UpdateDeviceSchema,
} from "@/types/device";

// create
export const create_device = async (data: CreateDeviceInfo) => {
  const { success, error } = CreateDeviceSchema.safeParse(data);

  if (!success) {
    throw new Error(ERROR.INVALID_ARGUMENTS(error));
  }

  // check repeat
  if (
    await prisma.device.findUnique({
      where: { serialNumber: data.serialNumber },
    })
  ) {
    throw new Error(ERROR.ALREADY_HAVE_THIS_DEVICE);
  }

  const newDevice = await prisma.device.create({
    data,
  });

  return newDevice;
};

// find
export const find_device = async () => {
  return await prisma.device.findMany({
    include: {
      deviceModel: { select: { model: true } },
      ipAddress: { select: { ip: true, network: { select: { name: true } } } },
      network: {
        select: { name: true },
      },
      history: true,
    },
  });
};

// find device history
export const find_device_history_by_id = async (data: IdInfo) => {
  const { success, error } = IdSchema.safeParse(data);

  if (!success) {
    throw new Error(ERROR.INVALID_ARGUMENTS(error));
  }

  const result = await prisma.history.findMany({
    where: { deviceId: data.id },
    orderBy: [
      {
        createAt: "desc", // or pass "asc" to order ascendingly
      },
    ],
  });

  return result.map((res) => ({
    ...JSON.parse(res.data),
    createAt: res.createAt,
  }));
};

// delete device by id
export const delete_device_by_id = async (data: IdInfo) => {
  const { success, error } = IdSchema.safeParse(data);

  if (!success) {
    throw new Error(ERROR.INVALID_ARGUMENTS(error));
  }

  if (!(await prisma.device.findUnique({ where: { id: data.id } }))) {
    throw new Error(ERROR.DELETE_DOES_NOT_EXIST(data.id.toString()));
  }

  return await prisma.device.delete({
    where: { id: data.id },
  });
};

// update device

export const update_device = async (data: UpdateDeviceInfo) => {
  const { success, error } = UpdateDeviceSchema.safeParse(data);

  if (!success) {
    throw new Error(ERROR.INVALID_ARGUMENTS(error));
  }

  const oldDeviceInfo = await prisma.device.findUnique({
    where: { id: data.id },
    include: {
      deviceModel: true,
      network: true,
      ipAddress: true,
    },
  });

  if (!oldDeviceInfo) {
    throw new Error(ERROR.DOES_NOT_EXIST(data.id.toString()));
  }

  const { id, ...rest } = data;

  const newDevice = await prisma.device.update({
    where: { id },
    data: {
      ...rest,
      history: { create: { data: JSON.stringify(oldDeviceInfo) } },
    },
  });

  return newDevice;
};
