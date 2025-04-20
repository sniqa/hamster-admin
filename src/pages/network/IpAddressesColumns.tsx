import { CONSTANT } from "@/lib/constant";
import { format } from "@/lib/date";
import { IpAddressInfo } from "@/types/network";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<IpAddressInfo>[] = [
  {
    accessorKey: "ip",
    header: CONSTANT.IP_ADDRESS,
  },
  {
    accessorKey: "network.name",
    header: CONSTANT.NETWORK_NAME,
  },
  {
    accessorKey: "user",
    header: CONSTANT.END_USER,
  },
  {
    accessorKey: "panelNumber",
    header: CONSTANT.PANEL_NUMBER,
  },
  {
    accessorKey: "device.serialNumber",
    header: CONSTANT.DEVICE_NAME,
  },
  {
    accessorKey: "updateAt",
    header: CONSTANT.LAST_UPDATE_TIME,
    cell: ({ cell }) => format(cell.getValue() as string),
  },
  {
    accessorKey: "remark",
    header: CONSTANT.REMARK,
  },
];
