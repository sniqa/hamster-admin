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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { delete_device_by_id } from "@/apis/device";
import { useDeviceContext } from "./context";

const DeviceComfirmBox = () => {
  const { open, setOpen, currentRow } = useDeviceContext();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => delete_device_by_id({ id: Number(currentRow?.id) }),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["device"],
      }),
  });

  return (
    <AlertDialog open={open === "delete"} onOpenChange={() => setOpen(null)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {`DELETE ${currentRow?.serialNumber}`}
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

export default DeviceComfirmBox;
