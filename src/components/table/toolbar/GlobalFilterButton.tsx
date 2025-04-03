import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RowData, Table } from "@tanstack/react-table";
import { SearchIcon, SearchXIcon } from "lucide-react";
import { CONSTANT } from "../utils/constant";
import DebouncedInput from "@/components/debounced-input";
import { useState } from "react";

const GlobalFilterButton = <TData extends RowData>({
  table: { setGlobalFilter, options, getState, resetGlobalFilter },
}: {
  table: Table<TData>;
}) => {
  const [state, setState] = useState(false);

  if (!options.enableGlobalFilter) return null;

  const { globalFilter } = getState();

  const reset = () => {
    setState((o) => !o);
    resetGlobalFilter();
  };

  return (
    <div className="flex gap-1">
      {state && (
        <DebouncedInput
          value={globalFilter}
          onChange={setGlobalFilter}
          className="h-8"
        />
      )}

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="size-8 cursor-pointer"
              size={"icon"}
              onClick={reset}
            >
              {state ? <SearchXIcon /> : <SearchIcon />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{CONSTANT.SHOW_HIDE_GLOBAL_FILTER}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default GlobalFilterButton;
