import { CONSTANT } from "@/lib/constant";
import { format } from "@/lib/date";
import { CreateDeviceInfo } from "@/types/device";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<CreateDeviceInfo>[] = [
  {
    accessorKey: "createAt",
    header: CONSTANT.LAST_UPDATE_TIME,
    cell: ({ cell }) => format(cell.getValue() as string),
  },
  {
    accessorKey: "name",
    header: CONSTANT.DEVICE_NAME,
  },
  {
    accessorKey: "user",
    header: CONSTANT.END_USER,
  },
  {
    accessorKey: "serialNumber",
    header: CONSTANT.SERIAL_NUMBER,
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
];
