import { CreateDeviceInfo } from "@/types/device";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<CreateDeviceInfo>[] = [
  {
    accessorKey: "name",
    header: "DeviceNAME",
  },
  {
    accessorKey: "serialNumber",
    header: "serialNumber",
  },
  {
    accessorKey: "user",
    header: "User",
  },
  {
    accessorKey: "usage",
    header: "usage",
  },

  {
    accessorKey: "loaction",
    header: "loaction",
  },
  {
    accessorKey: "network.name",
    header: "network",
  },
  {
    accessorKey: "ipAddress.ip",
    header: "IP",
  },
  {
    accessorKey: "deviceModel.model",
    header: "deviceModel",
  },
  {
    accessorKey: "remark",
    header: "remark",
  },
];
