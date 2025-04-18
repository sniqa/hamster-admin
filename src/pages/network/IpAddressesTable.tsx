import { ShadcnReactTable, useShadcnReactTable } from "@/components/table";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { find_ip_address_by_network_id } from "@/apis/network";
import { columns } from "./IpAddressesColumns";
import { useNetworkContext } from "./context";
import { EditIcon } from "lucide-react";
import IpAddressDialog from "./IpAddressDialog";
import { useState } from "react";
import { IpAddressInfo } from "@/types/network";

const IpAddressesTable = ({ showOnly }: { showOnly?: boolean }) => {
  const { currentRow } = useNetworkContext();
  const [open, setOpen] = useState(false);
  const [currentIp, setCurrentIp] = useState<IpAddressInfo | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["ip-address", currentRow?.id],
    queryFn: () =>
      find_ip_address_by_network_id({ id: Number(currentRow?.id) }),
  });

  const table = useShadcnReactTable({
    data: data,
    columns,
    enableShowOnly: showOnly,
    enableSelectRows: false,
    renderRowActions: ({ row }) => (
      <>
        <Button
          variant={"outline"}
          className="size-8 cursor-pointer"
          onClick={() => {
            setOpen(true);
            setCurrentIp(row.original);
          }}
        >
          <EditIcon />
        </Button>
      </>
    ),
  });

  const { mutate } = useMutation({
    mutationFn: () => {},
  });

  return (
    <>
      <ShadcnReactTable table={table} loading={isLoading} />

      {currentIp && (
        <IpAddressDialog
          open={open}
          onClose={() => setOpen((o) => !o)}
          onSubmit={mutate}
          defaultValue={currentIp}
        />
      )}
    </>
  );
};

export default IpAddressesTable;
