import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import FormInput from "@/components/form-input";
import { CONSTANT } from "@/lib/constant";
import FormTextarea from "@/components/form-textarea";
import { ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { IpAddressInfo } from "@/types/network";

export type IpAddressFormProps = {
  children: ReactNode;
  loading?: boolean;
  onSubmit: (data: IpAddressInfo) => void;
  defaultValue?: IpAddressInfo;
};

const IpAddressForm = ({
  children,
  loading,
  defaultValue,
}: IpAddressFormProps) => {
  const form = useForm({
    defaultValues: defaultValue,
  });

  console.log(defaultValue);

  const handlerOnSubmit = () => {};

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
        <div className="grid grid-cols-2 gap-4">
          <FormInput label={CONSTANT.IP_ADDRESS} name="ip" disabled />
          <FormInput
            label={CONSTANT.NETWORK_NAME}
            name="network.name"
            disabled
          />
          <FormInput label={CONSTANT.END_USER} name="user" />
          <FormInput label={CONSTANT.PANEL_NUMBER} name="panelNumber" />
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

export default IpAddressForm;
