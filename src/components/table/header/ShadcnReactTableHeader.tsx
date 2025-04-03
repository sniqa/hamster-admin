import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RowData, Table } from "@tanstack/react-table";
import RenderTableHeader from "./RenderTableHeader";

export type ShadcnReactTableHeaderProps<TData extends RowData> = {
  table: Table<TData>;
};
const ShadcnReactTableHeader = <TData extends RowData>({
  table,
}: ShadcnReactTableHeaderProps<TData>) => {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead
                key={header.id}
                colSpan={header.colSpan}
                style={{
                  width: `calc(var(--header-${header?.id}-size) * 1px)`,
                }}
              >
                {header.isPlaceholder ? null : (
                  <RenderTableHeader header={header} table={table} />
                )}
              </TableHead>
            );
          })}
          <TableHead
            style={{ width: `calc(100% - ${table.getTotalSize()}px)` }}
          />
        </TableRow>
      ))}
    </TableHeader>
  );
};

export default ShadcnReactTableHeader;
