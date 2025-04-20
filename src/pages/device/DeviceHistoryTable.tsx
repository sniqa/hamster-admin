import { ShadcnReactTable, useShadcnReactTable } from "@/components/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { DialogProps } from "@radix-ui/react-dialog";
import { useDeviceContext } from "./context";
import { useQuery } from "@tanstack/react-query";
import { find_device_history_by_id } from "@/apis/device";
import { columns } from "./DeviceHistoryColumns";
import { useMemo } from "react";

export type DeviceHistoryTableProps = {} & DialogProps;

const DeviceHistoryTable = ({ ...props }: DeviceHistoryTableProps) => {
  const { currentRow } = useDeviceContext();

  const { data, isLoading } = useQuery({
    queryKey: ["device", "device-history", currentRow?.id],
    queryFn: () => find_device_history_by_id({ id: Number(currentRow?.id) }),
  });

  useMemo(() => {
    console.log(data);
  }, [data]);

  const table = useShadcnReactTable({
    data,
    columns,
    enableSelectRows: false,
  });

  return (
    <Sheet {...props}>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Device History</SheetTitle>
          <SheetDescription>device history table</SheetDescription>
        </SheetHeader>
        <ShadcnReactTable table={table} loading={isLoading} />
      </SheetContent>
    </Sheet>
  );
};

export default DeviceHistoryTable;
