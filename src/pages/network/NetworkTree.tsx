import {
  create_network,
  find_network_tree,
  update_network,
} from "@/apis/network";
import { TreeView } from "@/components/tree-view";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EditIcon, PlusIcon, TrashIcon } from "lucide-react";
import NetworkDialog from "./NetworkDialog";
import { CreateNetworkInfo, UpdateNetworkInfo } from "@/types/network";
import { useNetworkContext } from "./context";
import NetworkComfirmBox from "./NetworkComfirmBox";

const NetworkTree = () => {
  const { open, setOpen, currentRow, setCurrentRow } = useNetworkContext();

  const queryClient = useQueryClient();

  // // query
  const { data } = useQuery({
    queryKey: ["network", "network-tree"],
    queryFn: find_network_tree,
  });

  // create
  const { mutate: create, isPending: createLoading } = useMutation({
    mutationFn: (data: CreateNetworkInfo) => create_network(data),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["network"],
      }),
    onSuccess: () => setOpen(null),
  });

  //update
  const { mutate: update, isPending: updateLoading } = useMutation({
    mutationFn: (data: CreateNetworkInfo) =>
      update_network({ ...data, id: Number(currentRow?.id) }),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["network"],
      }),
    onSuccess: () => setOpen(null),
  });

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex gap-x-2">
            <Button
              variant={"outline"}
              size={"icon"}
              className=" cursor-pointer"
              onClick={() => setOpen("add")}
            >
              {/* Create */}
              <PlusIcon />
            </Button>

            {currentRow && (
              <>
                <Button
                  variant={"outline"}
                  className=" cursor-pointer"
                  size={"icon"}
                  onClick={() => setOpen("update")}
                >
                  {/* Update */}
                  <EditIcon />
                </Button>
                <Button
                  variant={"outline"}
                  className=" cursor-pointer"
                  size={"icon"}
                  onClick={() => setOpen("delete")}
                >
                  {/* Delete */}
                  <TrashIcon />
                </Button>
              </>
            )}
          </div>
        </CardHeader>
        <ScrollArea className="h-full overflow-auto w-80">
          <CardContent>
            <TreeView
              data={data || []}
              onSelectChange={(item) =>
                setCurrentRow(item as unknown as UpdateNetworkInfo)
              }
            />
          </CardContent>
        </ScrollArea>
      </Card>

      <NetworkDialog
        open={open === "add"}
        onClose={() => setOpen(null)}
        onSubmit={create}
        isPending={createLoading}
      />
      {currentRow && (
        <>
          <NetworkDialog
            open={open === "update"}
            onClose={() => setOpen(null)}
            defaultValue={currentRow as unknown as CreateNetworkInfo}
            onSubmit={update}
            isPending={updateLoading}
          />

          <NetworkComfirmBox />
        </>
      )}
    </>
  );
};

export default NetworkTree;
