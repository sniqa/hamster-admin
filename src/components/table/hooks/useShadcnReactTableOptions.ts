import { RowData } from "@tanstack/react-table";
import { ShadncnReactTableOptions } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EMPTY_ARRAY: any = [];

export const useShadcnReactTableOptions = <TData extends RowData>({
  data,
  columns,
  enableColumnFilters = false,
  enableDensity = true,
  enableFullScreen = true,
  enableGlobalFilter = true,
  enableViewOptions = true,
  enableSelectRows = true,
  enableResizing = true,
  enableShowOnly = false,
  loading = false,
  ...rest
}: ShadncnReactTableOptions<TData>) => {
  if (!Array.isArray(data)) data = EMPTY_ARRAY;
  else if (data.length <= 0) data = EMPTY_ARRAY;
  if (!Array.isArray(columns)) data = EMPTY_ARRAY;
  else if (columns.length <= 0) columns = EMPTY_ARRAY;

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
    enableShowOnly,
    loading,
    ...rest,
  };
};
