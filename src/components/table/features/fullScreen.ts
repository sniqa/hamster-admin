import {
  makeStateUpdater,
  RowData,
  Table,
  TableFeature,
} from "@tanstack/react-table";

export interface FullScreenTableState {
  fullScreen: boolean;
}

export interface FullScreenOptions {
  enableFullScreen?: boolean;
}

export interface FullScreenInstance {
  toggleFullScreen: () => void;
}

export const FullScreenFeature: TableFeature<FullScreenTableState> = {
  getInitialState: (state): FullScreenTableState => {
    return {
      fullScreen: false,
      ...state,
    };
  },

  // define the new feature's default options
  getDefaultOptions: (): FullScreenOptions => {
    return {
      enableFullScreen: true,
    } as FullScreenOptions;
  },

  createTable: <TData extends RowData>(table: Table<TData>): void => {
    table.toggleFullScreen = () =>
      makeStateUpdater("fullScreen", table)((old) => !old);
  },
};
