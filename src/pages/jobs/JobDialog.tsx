import FormInput from "@/components/form-input";
import LoadingButton from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogTitle,
  DialogHeader,
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { CONSTANT } from "@/lib/constant";
import { DialogProps } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";

export type JobDialogProps = {
  onClose: () => void;
  onSubmit: (data: any) => void;
  defaultValue?: any;
  isLoading?: boolean;
  isPending?: boolean;
} & DialogProps;

const JobDialog = ({
  onClose,
  isLoading,
  isPending,
  defaultValue,
  ...props
}: JobDialogProps) => {
  const form = useForm({
    defaultValues: {
      name: "",
      type: "",
      repairer: "",
      solver: "",
      status: "",
    },
  });

  const handlerOnSubmit = () => {};

  return (
    <Dialog {...props} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{CONSTANT.NETWORK}</DialogTitle>
          <DialogDescription>
            {defaultValue ? CONSTANT.UPDATE_NETWORK : CONSTANT.CREATE_NETWORK}
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
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
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handlerOnSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <FormInput name="name" control={form.control} />
                <FormInput name="type" control={form.control} />
                <FormInput name="repairer" control={form.control} />
                <FormInput name="solver" control={form.control} />
                <FormInput name="status" control={form.control} />
              </div>

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
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default JobDialog;
