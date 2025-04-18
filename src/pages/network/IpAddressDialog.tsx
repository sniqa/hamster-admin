import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import IpAddressForm from "./IpAddressForm";
import { Button } from "@/components/ui/button";
import { CONSTANT } from "@/lib/constant";
import LoadingButton from "@/components/loading-button";
import { DialogProps } from "@radix-ui/react-dialog";
import { IpAddressInfo } from "@/types/network";

export type IpAddressDialogProps = {
  onClose: () => void;
  onSubmit: (data: IpAddressInfo) => void;
  defaultValue?: IpAddressInfo;
  isLoading?: boolean;
  isPending?: boolean;
} & DialogProps;

const IpAddressDialog = ({
  onClose,
  isLoading,
  isPending,
  onSubmit,
  defaultValue,
  ...props
}: IpAddressDialogProps) => {
  return (
    <Dialog {...props} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Network</DialogTitle>
          <DialogDescription>create network</DialogDescription>
        </DialogHeader>

        <IpAddressForm
          loading={isLoading}
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
        </IpAddressForm>
      </DialogContent>
    </Dialog>
  );
};

export default IpAddressDialog;
