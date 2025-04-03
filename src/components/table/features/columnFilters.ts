import {
  makeStateUpdater,
  RowData,
  Table,
  TableFeature,
} from "@tanstack/react-table";

export interface ColumnFiltersTableState {
  showColumnFilters: boolean;
}

export interface ColumnFiltersOptions {
  enableColumnFilters?: boolean;
}

export interface ColumnFiltersInstance {
  toggleShowColumnFilters: () => void;
}

export const ColumnFiltersFeature: TableFeature<ColumnFiltersTableState> = {
  getInitialState: (state): ColumnFiltersTableState => {
    return {
      showColumnFilters: false,
      ...state,
    };
  },

  // define the new feature's default options
  getDefaultOptions: (): ColumnFiltersOptions => {
    return {
      enableColumnFilters: true,
    } as ColumnFiltersOptions;
  },

  createTable: <TData extends RowData>(table: Table<TData>): void => {
    table.toggleShowColumnFilters = () =>
      makeStateUpdater("showColumnFilters", table)((old) => !old);
  },
};
