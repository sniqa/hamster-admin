import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowData,
  useReactTable,
} from "@tanstack/react-table";
import { ShadncnReactTableOptions } from "../types";
import { useShadcnReactTableOptions } from "./useShadcnReactTableOptions";
import { FullScreenFeature } from "@/components/table/features/fullScreen";
import { DensityFeature } from "@/components/table/features/density";
import { ColumnFiltersFeature } from "@/components/table/features/columnFilters";
import { useState } from "react";
import { useColumnsHeader } from "./useColumnsHeader";

export const useShadcnReactTable = <TData extends RowData>(
  options: ShadncnReactTableOptions<TData>
) => {
  const { data, columns, enableSelectRows, renderRowActions, ...rest } =
    useShadcnReactTableOptions(options);

  const [globalFilter, setGlobalFilter] = useState("");

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const newColumns = useColumnsHeader(columns, {
    enableSelectRows: true,
    renderRowActions,
  });

  const table = useReactTable({
    _features: [FullScreenFeature, DensityFeature, ColumnFiltersFeature],
    data,
    columns: newColumns,
    ...rest,
    enableSelectRows,
    state: {
      columnFilters,
      globalFilter,
    },
    columnResizeMode: "onChange",
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return table;
};
