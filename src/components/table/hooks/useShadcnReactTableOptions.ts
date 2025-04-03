import { RowData } from "@tanstack/react-table";
import { ShadncnReactTableOptions } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EMPTY_ARRAY: any = [];

export const useShadcnReactTableOptions = <TData extends RowData>({
  data,
  columns,
  enableColumnFilters = true,
  enableDensity = true,
  enableFullScreen = true,
  enableGlobalFilter = true,
  enableViewOptions = true,
  enableSelectRows = true,
  enableResizing = true,
  ...rest
}: ShadncnReactTableOptions<TData>) => {
  if (data.length <= 0) data = EMPTY_ARRAY;
  if (columns.length <= 0) columns = EMPTY_ARRAY;

  return {
    data,
    columns,
    enableColumnFilters,
    enableDensity,
    enableFullScreen,
    enableGlobalFilter,
    enableViewOptions,
    enableSelectRows,
    enableResizing,
    ...rest,
  };
};
