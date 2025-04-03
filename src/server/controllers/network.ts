import { prisma } from "@/server/db";
import { z } from "zod";
import { ERROR } from "@/server/utils/error";
import ip from "ip";
import { IdInfo, IdSchema } from "./validate";

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
const CreateNetworkSchema = z.object({
  type: z.string().min(1, { message: "" }),
  parentId: z.number().or(z.null()).optional(),
  ipStart: z.string().ip().optional(),
  ipEnd: z.string().ip().optional(),
  gateway: z.string().optional(),
  netmask: z.string().optional(),
  vlan: z.string().optional(),
  remark: z.string().optional(),
});

type CreateNetworkInfo = z.infer<typeof CreateNetworkSchema>;

export const create_network = async (data: CreateNetworkInfo) => {
  const { success, error } = CreateNetworkSchema.safeParse(data);

  if (!success) {
    throw new Error(ERROR.INVALID_ARGUMENTS(error));
  }

  if (await prisma.network.findUnique({ where: { type: data.type } })) {
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
  return prisma.network.findMany({
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

// update network
const UpdateNetworkSchema = z.object({
  id: z.number(),
  type: z.string().optional(),
  parentId: z.number().or(z.null()).optional(),
  ipStart: z.string().ip().optional(),
  ipEnd: z.string().ip().optional(),
  gateway: z.string().optional(),
  netmask: z.string().optional(),
  vlan: z.string().optional(),
  remark: z.string().optional(),
});

type UpdateNetworkInfo = z.infer<typeof UpdateNetworkSchema>;

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
