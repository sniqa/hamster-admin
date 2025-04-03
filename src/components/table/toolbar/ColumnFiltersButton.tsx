import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RowData, Table } from "@tanstack/react-table";
import { FilterIcon, FilterXIcon } from "lucide-react";
import { CONSTANT } from "../utils/constant";

const ColumnFiltersButton = <TData extends RowData>({
  table: { getState, toggleShowColumnFilters, options },
}: {
  table: Table<TData>;
}) => {
  if (!options.enableColumnFilters) return null;

  const { showColumnFilters } = getState();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className="size-8 cursor-pointer"
            size={"icon"}
            onClick={toggleShowColumnFilters}
          >
            {showColumnFilters ? <FilterXIcon /> : <FilterIcon />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{CONSTANT.SHOW_HIDE_COLUMN_FILTERS}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ColumnFiltersButton;
