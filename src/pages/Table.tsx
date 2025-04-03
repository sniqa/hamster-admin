import { ShadcnReactTable, useShadcnReactTable } from "@/components/table";
import { makeData, Person } from "./makeData";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

const data = makeData(5_000);

const Table = () => {
  const columns = useMemo<ColumnDef<Person, any>[]>(
    () => [
      {
        accessorKey: "id",
        filterFn: "equalsString", //note: normal non-fuzzy filter column - exact match required
      },
      {
        accessorKey: "firstName",
        cell: (info) => info.getValue(),
        filterFn: "includesStringSensitive", //note: normal non-fuzzy filter column - case sensitive
      },
      {
        accessorFn: (row) => row.lastName,
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        filterFn: "includesString", //note: normal non-fuzzy filter column - case insensitive
      },
      {
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        id: "fullName",
        header: "Full Name",
        cell: (info) => info.getValue(),
      },
    ],
    []
  );

  const table = useShadcnReactTable({
    data: [],
    columns,
    renderToolbarCustomActions: (table) => <>hello</>,
    renderRowActions: (cell) => <>world</>,
  });

  return (
    <div className="p-4 h-full w-full">
      <ShadcnReactTable table={table} />
    </div>
  );
};

export default Table;
