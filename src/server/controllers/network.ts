import { prisma } from "@/server/db";
import { z } from "zod";
import { ERROR } from "@/server/utils/error";
import ip from "ip";
import { IdInfo, IdSchema } from "./validate";
import {
  CreateNetworkInfo,
  CreateNetworkSchema,
  UpdateNetworkInfo,
  UpdateNetworkSchema,
} from "@/types/network";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const IpSchema = z.string().ip();

type Ip = z.infer<typeof IpSchema>;

const generateIpRange = (ipStart?: Ip, ipEnd?: Ip) => {
  if (!ipStart) {
    return [];
  }

  const ipStartLong = ip.toLong(ipStart);

  if (!ipEnd) {
    return [{ ip: ipStart }];
  }

  return Array.from(
    { length: ip.toLong(ipEnd) - ipStartLong + 1 },
    (_, index) => {
      return { ip: ip.fromLong(ipStartLong + index) };
    }
  );
};

// create network
export const create_network = async (data: CreateNetworkInfo) => {
  console.log(data);

  const { success, error } = CreateNetworkSchema.safeParse(data);

  if (!success) {
    throw new Error(ERROR.INVALID_ARGUMENTS(error));
  }

  if (await prisma.network.findUnique({ where: { name: data.name } })) {
    throw new Error(ERROR.ALREADY_HAVE_THIS_NETWORK);
  }

  const newNetwork = await prisma.network.create({
    data: {
      ...data,
      ipAddress: {
        create: generateIpRange(data.ipStart, data.ipEnd),
      },
    },
  });

  return newNetwork;
};

// find network tree

export const find_network_tree = async () => {
  return await prisma.network.findMany({
    where: {
      parentId: null,
    },
    include: {
      children: {
        include: { children: true },
      },
    },
  });
};

// delete network by id

export const delete_network_by_id = async (data: IdInfo) => {
  const { success, error } = IdSchema.safeParse(data);

  if (!success) {
    throw new Error(ERROR.INVALID_ARGUMENTS(error));
  }

  if (!(await prisma.network.findUnique({ where: { id: data.id } }))) {
    throw new Error(ERROR.DELETE_DOES_NOT_EXIST(data.id.toString()));
  }

  if (
    (await prisma.network.findMany({ where: { parentId: data.id } })).length > 0
  ) {
    throw new Error(ERROR.PLEASE_DELETE_CHILDREN_NETWORK_FIRST);
  }

  await prisma.ipAddress.deleteMany({ where: { networkId: data.id } });

  return await prisma.network.delete({ where: { id: data.id } });
};

// find network
export const find_network = async () => {
  return await prisma.network.findMany({
    include: { children: { include: { children: true } } },
  });
};

export const find_network_select = async () => {
  const result = await prisma.network.findMany({
    include: { ipAddress: true },
  });

  return result.map((item) => ({
    label: item.name,
    value: item.id,
    ips: item.ipAddress.map((ip) => ({ label: ip.ip, value: ip.id })),
  }));
};

// update network

export const update_network = async (data: UpdateNetworkInfo) => {
  const { success, error } = UpdateNetworkSchema.safeParse(data);

  if (!success) {
    throw new Error(ERROR.INVALID_ARGUMENTS(error));
  }

  if (!(await prisma.network.findUnique({ where: { id: data.id } }))) {
    throw new Error(ERROR.DOES_NOT_EXIST(data.id.toString()));
  }

  const { id, ...rest } = data;

  return await prisma.network.update({
    where: { id },
    data: rest,
  });
};

export const find_ip_address_by_network_id = async (data: IdInfo) => {
  const { success, error } = IdSchema.safeParse(data);

  if (!success) {
    throw new Error(ERROR.INVALID_ARGUMENTS(error));
  }

  return await prisma.ipAddress.findMany({
    where: { networkId: data.id },
    include: { network: true, devices: true },
  });
};
