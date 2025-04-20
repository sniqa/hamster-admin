import { CONSTANT } from "@/lib/constant";
import { format } from "@/lib/date";
import { CreateDeviceInfo } from "@/types/device";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<CreateDeviceInfo>[] = [
  {
    accessorKey: "name",
    header: CONSTANT.DEVICE_NAME,
  },
  {
    accessorKey: "serialNumber",
    header: CONSTANT.SERIAL_NUMBER,
  },
  {
    accessorKey: "user",
    header: CONSTANT.END_USER,
  },
  {
    accessorKey: "usage",
    header: CONSTANT.USAGE,
  },

  {
    accessorKey: "loaction",
    header: CONSTANT.LOCATION,
  },
  {
    accessorKey: "network.name",
    header: CONSTANT.NETWORK_NAME,
  },
  {
    accessorKey: "ipAddress.ip",
    header: CONSTANT.IP_ADDRESS,
  },
  {
    accessorKey: "deviceModel.model",
    header: CONSTANT.DEVICE_MODEL,
  },
  {
    accessorKey: "remark",
    header: CONSTANT.REMARK,
  },
  {
    accessorKey: "updateAt",
    header: CONSTANT.LAST_UPDATE_TIME,
    cell: ({ cell }) => format(cell.getValue() as string),
  },
];
