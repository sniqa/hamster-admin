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
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {`DELETE ${currentRow?.name}`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(null)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => mutate()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NetworkComfirmBox;
