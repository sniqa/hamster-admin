import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";

import { DialogProps } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

import FormInput from "@/components/form-input";
import { CONSTANT } from "@/lib/constant";
import FormSelect from "@/components/form-select";
import LoadingButton from "@/components/loading-button";
import RequireMark from "@/components/require-mark";

const DeviceDialog = (props: DialogProps) => {
  const form = useForm({
    defaultValues: {
      name: "",
      serialNumber: "",
      usage: "",
      location: "",
      network: null,
      ip: null,
    },
  });

  const handleOnSubmit = (values) => {
    console.log(values);
  };

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>设备</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleOnSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* name  */}
              <FormInput
                label={CONSTANT.DEVICE_NAME}
                name="name"
                control={form.control}
              />

              {/* serialNumber  */}
              <FormInput
                label={<RequireMark>{CONSTANT.SERIAL_NUMBER}</RequireMark>}
                control={form.control}
                name="serialNumber"
              />

              {/* usage  */}
              <FormInput
                label={CONSTANT.USAGE}
                control={form.control}
                name="usage"
              />

              {/* location  */}
              <FormInput
                label={CONSTANT.LOCATION}
                control={form.control}
                name="location"
              />

              {/* network */}
              <FormSelect
                label={CONSTANT.NETWORK_NAME}
                control={form.control}
                name="network"
                data={[{ value: "1", label: "1" }]}
                className="w-full"
              />

              {/* ip */}
              <FormSelect
                label={CONSTANT.IP_ADDRESS}
                control={form.control}
                name="ip"
                data={[{ value: "1", label: "1" }]}
                className="w-full"
              />

              {/* ip */}
              <FormSelect
                label={CONSTANT.DEVICE_MODEL}
                control={form.control}
                name="ip"
                data={[{ value: "1", label: "1" }]}
                className="w-full"
              />
            </div>

            <div className="flex justify-end w-full gap-4">
              <Button
                variant={"outline"}
                onClick={props.onOpenChange}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <LoadingButton className="cursor-pointer">Submit</LoadingButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DeviceDialog;
