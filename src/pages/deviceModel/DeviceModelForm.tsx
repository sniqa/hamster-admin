import FormInput from "@/components/form-input";
import RequireMark from "@/components/require-mark";
import { Form } from "@/components/ui/form";
import { CONSTANT } from "@/lib/constant";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import type { CreateDeviceModelInfo } from "@/types/deviceModel";
import FormTextarea from "@/components/form-textarea";
import { Skeleton } from "@/components/ui/skeleton";

export type DeviceModelFormProps = {
  children: ReactNode;
  loading?: boolean;
  onSubmit: (data: CreateDeviceModelInfo) => void;
  defaultValue?: CreateDeviceModelInfo;
};

const DeviceModelForm = ({
  children,
  loading,
  onSubmit,
  defaultValue,
}: DeviceModelFormProps) => {
  const form = useForm<CreateDeviceModelInfo>({
    values: defaultValue,
    defaultValues: {
      model: "",
      manufacturer: "",
      manufactureDate: "",
      shelfLife: "",
      category: "",
      remark: "",
    },
  });

  const handlerOnSubmit = (values: CreateDeviceModelInfo) => {
    onSubmit(values);
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
        <FormInput
          label={<RequireMark>{CONSTANT.DEVICE_MODEL}</RequireMark>}
          name="model"
        />
        <div className="grid grid-cols-2 gap-4">
          <FormInput label={CONSTANT.MANUFACTURE_DATA} name="manufactureDate" />
          <FormInput label={CONSTANT.MANUFACTURER} name="manufacturer" />
          <FormInput label={CONSTANT.SHELFLIFE} name="shelfLife" />
          <FormInput label={CONSTANT.CATEGORY} name="category" />
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

export default DeviceModelForm;
