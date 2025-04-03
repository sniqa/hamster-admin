import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RowData, Table } from "@tanstack/react-table";
import { Rows2Icon, Rows3Icon, Rows4Icon } from "lucide-react";
import { CONSTANT } from "../utils/constant";

const DensityButton = <TData extends RowData>({
  table,
}: {
  table: Table<TData>;
}) => {
  if (!table.options.enableDensity) return null;

  const { getState, toggleDensity } = table;

  const { density } = getState();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className="size-8 cursor-pointer"
            size={"icon"}
            onClick={toggleDensity}
          >
            {density === "md" ? (
              <Rows3Icon />
            ) : density === "lg" ? (
              <Rows4Icon />
            ) : (
              <Rows2Icon />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{CONSTANT.TOGGLE_FULL_SCREEN}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DensityButton;
