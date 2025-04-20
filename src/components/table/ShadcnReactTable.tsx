import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import ShadcnReactTableToolbar from "./toolbar/ShadcnReactTableToolbar";
import ShadcnReactTableHeader from "./header/ShadcnReactTableHeader";
import ShadcnReactTableBody from "./body/ShadcnReactTableBody";
import ShadcnReactTableFooter from "./footer/ShadcnReactTableFooter";
import {
  RowData,
  Table as ShadcnReactTableInstance,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { Skeleton } from "../ui/skeleton";
import { CONSTANT } from "./utils/constant";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export type ShadcnReactTableProps<TData extends RowData> = {
  table: ShadcnReactTableInstance<TData>;
  className?: string;
  loading?: boolean;
  style?: React.CSSProperties;
};

const ShadcnReactTable = <TData extends RowData>({
  table,
  className,
  loading = false,
  style,
}: ShadcnReactTableProps<TData>) => {
  const { fullScreen } = table.getState();

  const columnSizeVars = useMemo(() => {
    const headers = table.getFlatHeaders();
    const colSizes: { [key: string]: number } = {};
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i]!;
      colSizes[`--header-${header.id}-size`] = header.getSize();
      colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
    }
    return colSizes;
  }, [table.getState().columnSizingInfo, table.getState().columnSizing]);

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader className="flex justify-end w-full">
          <Skeleton className="h-8 w-48 rounded-xl" />
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Skeleton className="h-8 w-full rounded-xl" />
          <Skeleton className="h-8 w-full rounded-xl" />
          <Skeleton className="h-8 w-full rounded-xl" />
          <Skeleton className="h-8 w-full rounded-xl" />
          <Skeleton className="h-8 w-full rounded-xl" />
          <Skeleton className="h-8 w-full rounded-xl" />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Skeleton className="h-8 w-48 rounded-xl" />
          <Skeleton className="h-8 w-72 rounded-xl" />
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "box-border w-full h-full overflow-hidden flex flex-col",
        fullScreen && "fixed top-0 right-0 left-0 bottom-0 z-50",
        className
      )}
      style={style}
    >
      <CardHeader className="box-border">
        <ShadcnReactTableToolbar table={table} />
      </CardHeader>

      <CardContent style={{ maxHeight: "calc(100% - 7rem)" }}>
        <ScrollArea className="h-full w-full">
          {table.getRowModel().rows.length === 0 ? (
            <div className="w-full flex items-center justify-center h-24 bg-gray-100 rounded-xl">
              {CONSTANT.EMPTY}
            </div>
          ) : (
            <Table
              style={{
                ...columnSizeVars,
                width: `max(100%, ${table.getTotalSize()}px)`,
              }}
            >
              <ShadcnReactTableHeader table={table} />
              <ShadcnReactTableBody table={table} />
            </Table>
          )}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>

      <CardFooter className="box-border">
        <ShadcnReactTableFooter table={table} />
      </CardFooter>
    </Card>
  );
};

export default ShadcnReactTable;
