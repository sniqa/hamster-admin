import { RowData, Table } from "@tanstack/react-table";
import FullScreenButton from "./FullScreenButton";
import DensityButton from "./DensityButton";
import ViewOptionsButton from "./ViewOptiopsButton";
import ColumnFiltersButton from "./ColumnFiltersButton";
import GlobalFilterButton from "./GlobalFilterButton";

type ShadcnReactTableToolbarProps<TData extends RowData> = {
  table: Table<TData>;
};
const ShadcnReactTableToolbar = <TData extends RowData>({
  table,
}: ShadcnReactTableToolbarProps<TData>) => {
  return (
    <div className=" flex items-center justify-between h-9 box-border ">
      <div className="">
        {table.options.renderToolbarCustomActions &&
          table.options.renderToolbarCustomActions(table)}
      </div>

      <div className="flex gap-1">
        {/* globalfilter */}
        <GlobalFilterButton table={table} />

        {/* column filters */}
        <ColumnFiltersButton table={table} />

        {/* view options */}
        <ViewOptionsButton table={table} />

        {/* density */}
        <DensityButton table={table} />

        {/* full screen */}
        <FullScreenButton table={table} />
      </div>
    </div>
  );
};

export default ShadcnReactTableToolbar;
