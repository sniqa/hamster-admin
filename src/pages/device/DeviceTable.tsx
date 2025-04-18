import { ShadcnReactTable, useShadcnReactTable } from "@/components/table";
import { Button } from "@/components/ui/button";
import {
  DeleteIcon,
  EditIcon,
  HistoryIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";
import { columns } from "./DeviceColumns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { create_device, find_device, update_device } from "@/apis/device";
import DeviceDialog from "./DeviceDialog";
import NetworkDialog from "../network/NetworkDialog";
import DeviceModelDialog from "../deviceModel/DeviceModelDialog";
import { CreateNetworkInfo } from "@/types/network";
import { create_network } from "@/apis/network";
import { CreateDeviceModelInfo } from "@/types/deviceModel";
import { create_device_model } from "@/apis/deviceModel";
import { useDeviceContext } from "./context";
import { CreateDeviceInfo, UpdateDeviceInfo } from "@/types/device";
import DeviceComfirmBox from "./DeviceComfirmBox";
import DeviceHistoryTable from "./DeviceHistoryTable";

const DeviceTable = ({ showOnly }: { showOnly?: boolean }) => {
  const { open, setOpen, subOpen, setSubOpen, setCurrentRow, currentRow } =
    useDeviceContext();

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["device"],
    queryFn: find_device,
  });

  // create network
  const { mutate: createNetowrk } = useMutation({
    mutationFn: (data: CreateNetworkInfo) => create_network(data),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["network"],
      }),

    onSuccess: () => setSubOpen(null),
  });

  // create device model
  const { mutate: createDeviceModel } = useMutation({
    mutationFn: (data: CreateDeviceModelInfo) => create_device_model(data),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["device-model"],
      }),

    onSuccess: () => setSubOpen(null),
  });

  //create device
  const { mutate: createDevice } = useMutation({
    mutationFn: create_device,
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["device"],
      }),

    onSuccess: () => setOpen(null),
  });

  // update device
  const { mutate: updateDevice, isPending: updateDeviceLoading } = useMutation({
    mutationFn: (data: CreateDeviceInfo) =>
      update_device({ ...data, id: Number(currentRow?.id) }),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["device"],
      }),

    onSuccess: () => setOpen(null),
  });

  const table = useShadcnReactTable({
    data,
    columns,
    enableShowOnly: showOnly,
    renderToolbarCustomActions: () => (
      <>
        <Button
          variant={"outline"}
          className="h-8 cursor-pointer"
          onClick={() => setOpen("add")}
        >
          Create
          <PlusIcon />
        </Button>
      </>
    ),
    renderRowActions: ({ row }) => (
      <div className="flex gap-2">
        <Button
          variant={"outline"}
          className="size-8 cursor-pointer"
          onClick={() => {
            setOpen("delete");
            setCurrentRow(row.original as unknown as UpdateDeviceInfo);
          }}
        >
          <TrashIcon />
        </Button>

        <Button
          variant={"outline"}
          className="size-8 cursor-pointer"
          onClick={() => {
            setOpen("update");
            setCurrentRow(row.original as unknown as UpdateDeviceInfo);
          }}
        >
          <EditIcon />
        </Button>

        <Button
          variant={"outline"}
          className="size-8 cursor-pointer"
          onClick={() => {
            setOpen("history");
            setCurrentRow(row.original as unknown as UpdateDeviceInfo);
          }}
        >
          <HistoryIcon />
        </Button>
      </div>
    ),
  });

  return (
    <>
      <ShadcnReactTable table={table} loading={isLoading} />
      {/* create */}
      <DeviceDialog
        open={open === "add"}
        onClose={() => setOpen(null)}
        onSubmit={createDevice}
        onCreateNetwork={() => setSubOpen("network")}
        onCreateDeviceModel={() => setSubOpen("deviceModel")}
      />
      {/* update */}
      {currentRow && (
        <DeviceDialog
          open={open === "update"}
          onClose={() => setOpen(null)}
          onSubmit={updateDevice}
          defaultValue={currentRow as unknown as CreateDeviceInfo}
          onCreateNetwork={() => setSubOpen("network")}
          onCreateDeviceModel={() => setSubOpen("deviceModel")}
        />
      )}
      {/* delete */}
      <DeviceComfirmBox />
      {/* create network */}
      <NetworkDialog
        onClose={() => setSubOpen(null)}
        open={subOpen === "network"}
        onSubmit={createNetowrk}
      />
      {/* create deviceModel */}
      <DeviceModelDialog
        open={subOpen === "deviceModel"}
        onClose={() => setSubOpen(null)}
        onSubmit={createDeviceModel}
      />

      {/* device history */}
      <DeviceHistoryTable
        open={open === "history"}
        onOpenChange={() => setOpen(null)}
      />
    </>
  );
};

export default DeviceTable;
