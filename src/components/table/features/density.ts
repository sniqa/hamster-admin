import {
  makeStateUpdater,
  RowData,
  Table,
  TableFeature,
} from "@tanstack/react-table";

export type DensityState = "sm" | "md" | "lg";

export interface DensityTableState {
  density: DensityState;
}

export interface DensityOptions {
  enableDensity?: boolean;
}

export interface DensityInstance {
  toggleDensity: () => void;
}

export const DensityFeature: TableFeature<DensityTableState> = {
  getInitialState: (state): DensityTableState => {
    return {
      density: "md",
      ...state,
    };
  },

  // define the new feature's default options
  getDefaultOptions: (): DensityOptions => {
    return {
      enableDensity: true,
    } as DensityOptions;
  },

  createTable: <TData extends RowData>(table: Table<TData>): void => {
    table.toggleDensity = () =>
      makeStateUpdater(
        "density",
        table
      )((old) => (old === "lg" ? "md" : old === "md" ? "sm" : "lg"));
  },
};
