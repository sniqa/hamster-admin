import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import FormInput from "@/components/form-input";
import { CONSTANT } from "@/lib/constant";
import FormSelect, { type SelectItemData } from "@/components/form-select";
import RequireMark from "@/components/require-mark";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactNode, useMemo } from "react";
import FormTextarea from "@/components/form-textarea";
import { CreateDeviceInfo, CreateDeviceSchema } from "@/types/device";
import { zodResolver } from "@hookform/resolvers/zod";

export type DeviceForm = {
  onSubmit: (device: CreateDeviceInfo) => void;
  children: ReactNode;
  networkData: Array<SelectItemData & { ips: SelectItemData[] }>;
  deviceModelData: SelectItemData[];
  defaultValue?: CreateDeviceInfo;
  loading?: boolean;
  onCreateNetwork?: () => void;
  onCreateDeviceModel?: () => void;
};

const DeviceForm = ({
  onSubmit,
  children,
  networkData,
  deviceModelData,
  defaultValue,
  loading,
  onCreateNetwork,
  onCreateDeviceModel,
}: DeviceForm) => {
  const form = useForm<CreateDeviceInfo>({
    resolver: zodResolver(CreateDeviceSchema),
    defaultValues: defaultValue
      ? defaultValue
      : {
          serialNumber: "",
          usage: "",
          location: "",
          user: "",
          name: "",
          networkId: null,
          deviceModelId: null,
          ipAddressId: null,
          remark: "",
        },
  });

  useMemo(() => {
    console.log(defaultValue);
  }, [defaultValue]);

  const handleOnSubmit = (values: CreateDeviceInfo) => {
    const { networkId, deviceModelId, ipAddressId, ...rest } = values;

    onSubmit({
      networkId: networkId ? Number(networkId) : null,
      deviceModelId: deviceModelId ? Number(deviceModelId) : null,
      ipAddressId: ipAddressId ? Number(ipAddressId) : null,
      ...rest,
    });
  };

  const currentNetworkId = form.watch("networkId");

  const ipAddressData = useMemo(() => {
    const currentNetwork =
      networkData &&
      networkData.find((network) => {
        return network.value === Number(currentNetworkId);
      });

    return currentNetwork?.ips || [];
  }, [networkData, currentNetworkId]);

  if (loading) {
    return (
      <>
        <div className="grid grid-cols-2 gap-6">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <Skeleton className="h-14 w-full rounded-md" />
        <div className="flex justify-end w-full gap-4">
          <Skeleton className="h-10 w-24 rounded-md" />
          <Skeleton className="h-10 w-24 rounded-md" />
        </div>
      </>
    );
  }

  return (
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

          {/* user  */}
          <FormInput label={CONSTANT.USER} control={form.control} name="user" />

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
            name="networkId"
            data={networkData}
            onCreate={onCreateNetwork}
            className="w-full"
            valueAsNumber
            onReset={() => (
              form.resetField("networkId"), form.resetField("ipAddressId")
            )}
          />

          {/* ip */}
          <FormSelect
            label={CONSTANT.IP_ADDRESS}
            control={form.control}
            name="ipAddressId"
            data={ipAddressData}
            valueAsNumber
            className="w-full"
            onReset={() => form.resetField("ipAddressId")}
          />

          {/* device model */}
          <FormSelect
            label={CONSTANT.DEVICE_MODEL}
            control={form.control}
            name="deviceModelId"
            data={deviceModelData}
            onCreate={onCreateDeviceModel}
            valueAsNumber
            className="w-full"
            onReset={() => form.resetField("deviceModelId")}
          />
        </div>

        <div>
          <FormTextarea
            control={form.control}
            label={CONSTANT.REMARK}
            name="remark"
          />
        </div>

        {children}
      </form>
    </Form>
  );
};

export default DeviceForm;
