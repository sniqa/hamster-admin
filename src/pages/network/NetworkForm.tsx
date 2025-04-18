import FormInput from "@/components/form-input";
import FormSelect, { SelectItemData } from "@/components/form-select";
import RequireMark from "@/components/require-mark";
import { Form } from "@/components/ui/form";
import { CONSTANT } from "@/lib/constant";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { CreateNetworkSchema, CreateNetworkInfo } from "@/types/network";
import FormTextarea from "@/components/form-textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { zodResolver } from "@hookform/resolvers/zod";

export type NetworkFormProps = {
  children: ReactNode;
  loading?: boolean;
  networkData: Array<SelectItemData & { ips: SelectItemData[] }>;
  onSubmit: (data: CreateNetworkInfo) => void;
  defaultValue?: CreateNetworkInfo;
};

const NetworkForm = ({
  children,
  loading,
  networkData,
  onSubmit,
  defaultValue,
}: NetworkFormProps) => {
  const form = useForm<CreateNetworkInfo>({
    resolver: zodResolver(CreateNetworkSchema),
    values: defaultValue,
    defaultValues: {
      name: "",
      parentId: null,
      ipStart: "",
      ipEnd: "",
      gateway: "",
      netmask: "",
      vlan: "",
      remark: "",
    },
  });

  const handlerOnSubmit = (values: CreateNetworkInfo) => {
    const { parentId, ...rest } = values;

    onSubmit({
      parentId: parentId ? Number(parentId) : null,
      ...rest,
    });
  };

  if (loading) {
    return (
      <>
        <Skeleton className="h-10 w-full rounded-md" />
        <div className="grid grid-cols-2 gap-6">
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
        onSubmit={form.handleSubmit(handlerOnSubmit)}
        className="flex flex-col gap-4"
      >
        <FormSelect
          label={CONSTANT.NETMASK}
          name="parentId"
          data={networkData}
          onReset={() => form.resetField("parentId")}
          valueAsNumber
        />

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label={<RequireMark>{CONSTANT.NETWORK_NAME}</RequireMark>}
            name="name"
          />
          <FormInput label={CONSTANT.START_IP_ADDRESS} name="ipStart" />
          <FormInput label={CONSTANT.END_IP_ADDRESS} name="ipEnd" />
          <FormInput label={CONSTANT.GATEWAY} name="gateway" />
          <FormInput label={CONSTANT.NETMASK} name="netmask" />
          {/* <FormInput label={CONSTANT.VLAN} name="vlan" /> */}
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

export default NetworkForm;
