import { Prisma } from "@prisma/client";

export type CreateDeviceInfo = {
  serialNumber: string;
  location?: string;
  name?: string;
  networkId?: string | number | null;
  ipAddressId?: string | number | null;
  deviceModelId?: string | number | null;
  usage?: string;
  remark?: string;
};

export type DeviceInfo = Prisma.DeviceGetPayload<{
  include: {
    ipAddress: true;
    network: true;
    deviceModel: true;
  };
}>;
