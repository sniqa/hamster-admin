import { ShadcnReactTable, useShadcnReactTable } from "@/components/table";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const DeviceTable = ({ onCreate }: { onCreate: () => void }) => {
  const table = useShadcnReactTable({
    data: [],
    columns: [],
    renderToolbarCustomActions: (table) => (
      <>
        <Button
          variant={"outline"}
          className="h-8 cursor-pointer"
          onClick={onCreate}
        >
          Create
          <PlusIcon />
        </Button>
      </>
    ),
    renderRowActions: (cell) => (
      <>
        <Button variant={"outline"} className="size-8"></Button>
      </>
    ),
  });

  return <ShadcnReactTable table={table} />;
};

export default DeviceTable;
