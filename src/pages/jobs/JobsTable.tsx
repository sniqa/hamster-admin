import { useShadcnReactTable, ShadcnReactTable } from "@/components/table";
import { columns } from "./JobsTableColumns";
import JobDialog from "./JobDialog";
import { Button } from "@/components/ui/button";
import { useJobsContext } from "./JobContext";
import { PlusIcon } from "lucide-react";
const JobsTable = () => {
  const { setOpen, open } = useJobsContext();

  const table = useShadcnReactTable({
    data: [],
    columns,
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
  });

  const onCreate = () => {};

  return (
    <>
      <ShadcnReactTable table={table} />
      <JobDialog
        open={open === "add"}
        onClose={() => setOpen(null)}
        onSubmit={onCreate}
      />
    </>
  );
};

export default JobsTable;
