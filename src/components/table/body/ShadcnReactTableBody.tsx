import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { flexRender, RowData, Table } from "@tanstack/react-table";

type ShadcnReactTableBodyProps<TData extends RowData> = {
  table: Table<TData>;
};

const ShadcnReactTableBody = <TData extends RowData>({
  table,
}: ShadcnReactTableBodyProps<TData>) => {
  return (
    <TableBody>
      {table.getRowModel().rows.map((row) => (
        <TableRow key={row.id}>
          {row.getVisibleCells().map((cell) => {
            return (
              <TableCell
                key={cell.id}
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
