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

import { PlusIcon } from "lucide-react";
import { useState } from "react";

import DebouncedInput from "./debounced-input";

export type SelectItemData = {
  label: React.ReactNode;
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
  data: SelectItemData[];
} & Omit<ControllerProps<TFieldValues, TName>, "render">;

const FormInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  placeholder,
  description,
  className,
  data,
  ...props
}: FormInputProps<TFieldValues, TName>) => {
  const [state, setState] = useState("");

  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <Select onValueChange={field.onChange} value={String(field.value)}>
            <FormControl className={className}>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <div className="flex items-center mb-1 gap-1 border-1 rounded-md">
                  <DebouncedInput
                    value={state}
                    onChange={(v) => setState(v)}
                    className="border-0 h-8"
                  />
                  <Button variant={"ghost"} size={"icon"} className="size-8">
                    <PlusIcon />
                  </Button>
                </div>
              </SelectGroup>
              {data.map(
                (d) =>
                  d && (
                    <SelectItem
                      key={d.value}
                      value={String(d.value)}
                      className="h-8"
                    >
                      {d.label ? d.label : CONSTANT.EMPTY}
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
