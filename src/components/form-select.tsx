import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { CONSTANT } from "@/lib/constant";
import { SelectGroup } from "@radix-ui/react-select";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

import DebouncedInput from "./debounced-input";

export type SelectItemData = {
  label: string;
  value: string | number | null;
};

export type FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  label?: React.ReactNode;
  placeholder?: string;
  description?: React.ReactNode;
  className?: string;
  data: Array<SelectItemData>;
  onCreate?: () => void;
  onReset?: () => void;
  valueAsNumber?: boolean;
} & Omit<ControllerProps<TFieldValues, TName>, "render">;

// const isHave = (origin: string | number, target: unknown) => {};

const FormInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  placeholder,
  description,
  className,
  data,
  onCreate,
  onReset,
  valueAsNumber = false,
  ...props
}: FormInputProps<TFieldValues, TName>) => {
  const [state, setState] = useState<string>("");

  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <Select
            onValueChange={
              valueAsNumber
                ? (val) => field.onChange(Number(val))
                : field.onChange
            }
            value={String(field.value)}
          >
            <FormControl className={className}>
              <SelectTrigger onReset={onReset}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup className="border-b">
                <div className="flex items-center gap-1">
                  {/* search */}
                  <DebouncedInput
                    value={state}
                    onChange={(v) => setState(String(v))}
                    className="border-0 h-8"
                    placeholder="Search..."
                  />

                  {/* create new select */}
                  {onCreate && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant={"ghost"}
                            size={"icon"}
                            className="size-8 cursor-pointer"
                            onClick={onCreate}
                          >
                            <PlusIcon />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>{CONSTANT.CREATE}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </SelectGroup>
              {data &&
                data.map(
                  (item) =>
                    item &&
                    item.label?.includes(state) && (
                      <SelectItem
                        key={item.value}
                        value={String(item.value)}
                        className="h-8"
                      >
                        {item.label ? item.label : CONSTANT.EMPTY}
                      </SelectItem>
                    )
                )}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
