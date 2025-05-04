import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<any>[] = [
  { accessorKey: "createAt", header: "创建时间" },
  {
    accessorKey: "name",
    header: "名称",
  },
  {
    accessorKey: "type",
    header: "服务类型",
  },
  {
    accessorKey: "repairer",
    header: "报修人",
  },
  {
    accessorKey: "solver",
    header: "处理人",
  },
  {
    accessorKey: "status",
    header: "处理进展",
  },
  {
    accessorKey: "修复时间",
    header: "updateAt",
  },
];
