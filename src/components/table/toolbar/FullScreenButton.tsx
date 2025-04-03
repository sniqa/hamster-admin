import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RowData, Table } from "@tanstack/react-table";
import { MaximizeIcon, MinimizeIcon } from "lucide-react";
import { CONSTANT } from "../utils/constant";

const FullScreenButton = <TData extends RowData>({
  table,
}: {
  table: Table<TData>;
}) => {
  if (!table.options.enableFullScreen) return null;

  const { getState, toggleFullScreen } = table;

  const { fullScreen } = getState();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className="size-8 cursor-pointer"
            size={"icon"}
            onClick={toggleFullScreen}
          >
            {fullScreen ? <MinimizeIcon /> : <MaximizeIcon />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{CONSTANT.TOGGLE_FULL_SCREEN}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default FullScreenButton;
