/* eslint-disable @typescript-eslint/no-empty-object-type */
import { RowData, ColumnDef, Table, CellContext } from "@tanstack/react-table";
import {
  DensityOptions,
  DensityInstance,
  DensityTableState,
} from "./features/density";
import {
  FullScreenTableState,
  FullScreenOptions,
  FullScreenInstance,
} from "./features/fullScreen";
import {
  ColumnFiltersInstance,
  ColumnFiltersOptions,
  ColumnFiltersTableState,
} from "./features/columnFilters";
import { ReactNode } from "react";

export type ShadncnReactTableState = {} & DensityTableState &
  FullScreenTableState &
  ColumnFiltersTableState;

export type ShadncnReactTableOptions<TData extends RowData> = {
  data: TData[];
  columns: ColumnDef<TData>[];
  enableGlobalFilter?: boolean;
  enableViewOptions?: boolean;
  enableSelectRows?: boolean;
  enableResizing?: boolean;
  enableShowOnly?: boolean;
  loading?: boolean;
  renderRowActions?: (cell: CellContext<TData, unknown>) => ReactNode;
  renderToolbarCustomActions?: (table: Table<TData>) => ReactNode;
} & DensityOptions &
  FullScreenOptions &
  ColumnFiltersOptions;

export type ShadncnReactTableInstance = {} & DensityInstance &
  FullScreenInstance &
  ColumnFiltersInstance;

declare module "@tanstack/react-table" {
  interface TableState extends ShadncnReactTableState {}
  interface TableOptionsResolved<TData extends RowData>
    extends ShadncnReactTableOptions<TData> {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Table<TData extends RowData> extends ShadncnReactTableInstance {}
}
