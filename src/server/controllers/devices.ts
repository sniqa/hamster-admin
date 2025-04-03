import { prisma } from "@/server/db";
import { z } from "zod";
import { ERROR } from "@/server/utils/error";
import { IdInfo, IdSchema } from "./validate";

// create
const CreateDeviceSchema = z.object({
  name: z.string().optional(),
  serialNumber: z.string().min(1, { message: "" }),
  usage: z.string().optional(),
  location: z.string().optional(),
  remark: z.string().optional(),
  deviceModelId: z.number().or(z.null()).optional(),
  networkId: z.number().or(z.null()).optional(),
  ipAddressId: z.number().or(z.null()).optional(),
});

type CreateDeviceInfo = z.infer<typeof CreateDeviceSchema>;

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
      ipAddress: { select: { ip: true, network: { select: { type: true } } } },
      network: {
        select: { type: true },
      },
      history: true,
    },
  });
};

// find device history
export const find_device_history = async (data: IdInfo) => {
  const { success, error } = IdSchema.safeParse(data);

  if (!success) {
    throw new Error(ERROR.INVALID_ARGUMENTS(error));
  }

  return await prisma.history.findMany({
    where: { deviceId: data.id },
  });
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
const UpdateDeviceSchema = z.object({
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

type UpdateDeviceInfo = z.infer<typeof UpdateDeviceSchema>;
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

  console.log(oldDeviceInfo);

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
