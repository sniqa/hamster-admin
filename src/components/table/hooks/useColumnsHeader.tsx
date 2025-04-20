import { CellContext, ColumnDef, RowData } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ReactNode, useMemo } from "react";

const selectColumn = <TData extends RowData>(): ColumnDef<TData> => ({
  id: "select",
  header: ({ table }) => (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  ),
  enableSorting: false,
  enableHiding: false,
  enableResizing: false,
  size: 30,
});

const rowActionsColumn = <TData extends RowData>(
  cell: (cell: CellContext<TData, unknown>) => ReactNode
): ColumnDef<TData> => ({
  id: "actions",
  // header: "Actions",
  cell,
  enableSorting: false,
  enableHiding: false,
  enableResizing: false,
  size: 0,
});

type ColumnOptions<TData extends RowData> = {
  enableSelectRows?: boolean;
  renderRowActions?: (cell: CellContext<TData, unknown>) => ReactNode;
};

export const useColumnsHeader = <TData extends RowData>(
  columns: ColumnDef<TData>[],
  { enableSelectRows = true, renderRowActions }: ColumnOptions<TData>
): ColumnDef<TData>[] => {
  return useMemo(() => {
    let newColumns = columns;
    if (enableSelectRows) newColumns = [selectColumn(), ...newColumns];
    if (renderRowActions)
      newColumns = [...newColumns, rowActionsColumn(renderRowActions)];

    return newColumns;
  }, [columns, enableSelectRows, renderRowActions]);
};
