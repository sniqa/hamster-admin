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
import DeviceModelForm from "./DeviceModelForm";
import { CreateNetworkInfo } from "@/types/network";
import { CreateDeviceModelInfo } from "@/types/deviceModel";
import { CONSTANT } from "@/lib/constant";
// import { useQuery } from "@tanstack/react-query";
// import { find_device_model_select } from "@/apis/deviceModel";

export type DeviceModelDialogProps = {
  onClose: () => void;
  onSubmit: (data: CreateDeviceModelInfo) => void;
  defaultValue?: CreateNetworkInfo;
} & DialogProps;

const DeviceModelDialog = ({
  onClose,
  onSubmit,
  ...props
}: DeviceModelDialogProps) => {
  return (
    <Dialog {...props} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>DeviceModel</DialogTitle>
          <DialogDescription>Create DeviceModel</DialogDescription>
        </DialogHeader>

        <DeviceModelForm onSubmit={onSubmit}>
          <div className="flex justify-end w-full gap-4">
            <Button
              variant={"outline"}
              onClick={onClose}
              className="cursor-pointer"
            >
              {CONSTANT.CANCEL}
            </Button>
            <LoadingButton className="cursor-pointer">
              {CONSTANT.SUBMIT}
            </LoadingButton>
          </div>
        </DeviceModelForm>
      </DialogContent>
    </Dialog>
  );
};

export default DeviceModelDialog;
