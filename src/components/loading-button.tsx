import { Button, ButtonProps } from "@/components/ui/button";

import { Loader2 } from "lucide-react";

export type LoadingButtonProps = {
  loading?: boolean;
} & ButtonProps;

const LoadingButton = ({
  loading,
  children,
  type = "submit",
  ...props
}: LoadingButtonProps) => {
  return (
    <Button disabled={loading} type={type} {...props}>
      {loading ? (
        <>
          <Loader2 className="animate-spin" />
          Please wait
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default LoadingButton;
