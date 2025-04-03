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

export type ShadcnReactTableProps<TData extends RowData> = {
  table: ShadcnReactTableInstance<TData>;
  className?: string;
  style?: React.CSSProperties;
};

const ShadcnReactTable = <TData extends RowData>({
  table,
  className,
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

  return (
    <Card
      className={cn(
        "box-border w-full ",
        fullScreen && "fixed top-0 right-0 left-0 bottom-0 z-50",
        className
      )}
      style={style}
    >
      <CardHeader className="box-border">
        <div className="">
          <ShadcnReactTableToolbar table={table} />
        </div>
      </CardHeader>

      <CardContent
        className="overflow-auto box-border "
        style={{ maxHeight: `calc(100% - 11rem)` }}
      >
        <Table
          style={{
            ...columnSizeVars,
            width: `max(100%, ${table.getTotalSize()}px)`,
          }}
        >
          <ShadcnReactTableHeader table={table} />
          <ShadcnReactTableBody table={table} />
        </Table>
      </CardContent>

      <CardFooter className="box-border">
        <ShadcnReactTableFooter table={table} />
      </CardFooter>
    </Card>
  );
};

export default ShadcnReactTable;
