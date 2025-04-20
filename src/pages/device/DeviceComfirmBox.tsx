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
import { CONSTANT } from "@/lib/constant";

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
          <AlertDialogTitle>{CONSTANT.COMFIRM_OPERATE}</AlertDialogTitle>
          <AlertDialogDescription>
            {`${CONSTANT.DELETE}${CONSTANT.DEVICE}(${CONSTANT.SERIAL_NUMBER}): ${currentRow?.serialNumber}`}
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

export default DeviceComfirmBox;
