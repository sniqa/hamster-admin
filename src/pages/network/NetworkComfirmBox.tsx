import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useNetworkContext } from "./context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { delete_network_by_id } from "@/apis/network";
import { CONSTANT } from "@/lib/constant";

const NetworkComfirmBox = () => {
  const { open, setOpen, currentRow, setCurrentRow } = useNetworkContext();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () =>
      delete_network_by_id({ id: Number(currentRow?.id) }),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["network"],
      }),
    onSuccess: () => setCurrentRow(null),
  });

  return (
    <AlertDialog open={open === "delete"} onOpenChange={() => setOpen(null)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{CONSTANT.COMFIRM_OPERATE}</AlertDialogTitle>
          <AlertDialogDescription>
            {`${CONSTANT.DELETE}${CONSTANT.NETWORK}: ${currentRow?.name}`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => setOpen(null)}
            className="cursor-pointer"
          >
            {CONSTANT.CANCEL}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => mutate()}
            className="cursor-pointer"
          >
            {CONSTANT.COMFIRM}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NetworkComfirmBox;
