import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// import { Form } from "@/components/ui/form";

import { DialogProps } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/loading-button";
import DeviceForm from "./DeviceForm";
import { useQuery } from "@tanstack/react-query";
import { find_network_select } from "@/apis/network";
import { find_device_model_select } from "@/apis/deviceModel";
import { CONSTANT } from "@/lib/constant";
import { CreateDeviceInfo } from "@/types/device";

export type DeviceDialogProps = {
  onClose: () => void;
  onSubmit: (data: CreateDeviceInfo) => void;
  defaultValue?: CreateDeviceInfo;
  onCreateNetwork?: () => void;
  onCreateDeviceModel?: () => void;
} & DialogProps;

const DeviceDialog = ({
  onClose,
  onSubmit,
  defaultValue,
  onCreateNetwork,
  onCreateDeviceModel,
  ...props
}: DeviceDialogProps) => {
  const { isLoading: networkLoading, data: networkData } = useQuery({
    queryKey: ["network", "network/select"],
    queryFn: () => find_network_select(),
  });
  const { isLoading: deviceModelLoading, data: deviceModelData } = useQuery({
    queryKey: ["device-model", "device-model/select"],
    queryFn: () => find_device_model_select(),
  });

  return (
    <>
      <Dialog {...props} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>设备</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <DeviceForm
            networkData={networkData}
            deviceModelData={deviceModelData}
            defaultValue={defaultValue}
            onSubmit={onSubmit}
            loading={networkLoading || deviceModelLoading}
            onCreateNetwork={onCreateNetwork}
            onCreateDeviceModel={onCreateDeviceModel}
          >
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
          </DeviceForm>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeviceDialog;
