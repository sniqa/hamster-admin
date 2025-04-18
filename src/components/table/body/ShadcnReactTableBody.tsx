import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { flexRender, RowData, Table } from "@tanstack/react-table";

type ShadcnReactTableBodyProps<TData extends RowData> = {
  table: Table<TData>;
};

const ShadcnReactTableBody = <TData extends RowData>({
  table,
}: ShadcnReactTableBodyProps<TData>) => {
  const { density } = table.getState();

  return (
    <TableBody>
      {table.getRowModel().rows.map((row) => (
        <TableRow key={row.id}>
          {row.getVisibleCells().map((cell) => {
            return (
              <TableCell
                key={cell.id}
                className={cn(
                  density === "sm" ? "p-1" : density === "md" ? "p-2" : "p-3",
                  "transition-all"
                )}
                style={{
                  width: `calc(var(--col-${cell.column.id}-size) * 1px)`,
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            );
          })}
          <TableCell
            style={{ width: `calc(100% - ${table.getTotalSize()}px)` }}
          />
        </TableRow>
      ))}
    </TableBody>
  );
};

export default ShadcnReactTableBody;
