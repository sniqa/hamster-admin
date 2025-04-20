import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { DialogProps } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

import LoadingButton from "@/components/loading-button";
import NetworkForm from "./NetworkForm";
import { useQuery } from "@tanstack/react-query";
import { find_network_select } from "@/apis/network";
import { CreateNetworkInfo } from "@/types/network";
import { CONSTANT } from "@/lib/constant";

export type NetworkDialogProps = {
  onClose: () => void;
  onSubmit: (data: CreateNetworkInfo) => void;
  defaultValue?: CreateNetworkInfo;
  isPending?: boolean;
  onCreateNetwork?: () => void;
  onCreateDeviceModel?: () => void;
} & DialogProps;

const NetworkDialog = ({
  onClose,
  onSubmit,
  isPending,
  defaultValue,
  ...props
}: NetworkDialogProps) => {
  const { isLoading, data } = useQuery({
    queryKey: ["network", "network/select"],
    queryFn: find_network_select,
  });

  return (
    <Dialog {...props} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{CONSTANT.NETWORK}</DialogTitle>
          <DialogDescription>
            {defaultValue ? CONSTANT.UPDATE_NETWORK : CONSTANT.CREATE_NETWORK}
          </DialogDescription>
        </DialogHeader>

        <NetworkForm
          loading={isLoading}
          networkData={data}
          onSubmit={onSubmit}
          defaultValue={defaultValue}
        >
          <div className="flex justify-end w-full gap-4">
            <Button
              variant={"outline"}
              onClick={onClose}
              className="cursor-pointer"
            >
              {CONSTANT.CANCEL}
            </Button>
            <LoadingButton className="cursor-pointer" loading={isPending}>
              {CONSTANT.SUBMIT}
            </LoadingButton>
          </div>
        </NetworkForm>
      </DialogContent>
    </Dialog>
  );
};

export default NetworkDialog;
