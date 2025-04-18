import { IpAddressInfo } from "@/types/network";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<IpAddressInfo>[] = [
  {
    accessorKey: "ip",
    header: "IP",
  },
  {
    accessorKey: "network.name",
    header: "Network",
  },
  {
    accessorKey: "user",
    header: "User",
  },
  {
    accessorKey: "panelNumber",
    header: "PanelNumber",
  },
  {
    accessorKey: "remark",
    header: "Remark",
  },
];
