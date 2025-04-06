"use client"

import {
  cn
} from "@/lib/utils"
import {
  Button
} from "@/components/ui/button"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Check,
  ChevronsUpDown
} from "lucide-react"
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form"


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

const FormSelect = <
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

  return  <FormField
  {...props}
  render={({ field }) => (
    <FormItem className="flex flex-col">
     {label && <FormLabel>{label}</FormLabel>}
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "w-[200px] justify-between",
                !field.value && "text-muted-foreground"
              )}
              
            >
              {field.value
                ? data.find(
                    (item) => item.value === field.value
                  )?.label
                : "Select language"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search language..." />
            <CommandList>
              <CommandEmpty>No language found.</CommandEmpty>
              <CommandGroup>
                {data.map((item) => (
                  <CommandItem
                    value={item.label}
                    key={item.value}
                    onSelect={() => {
                      form.setValue("name_5103796661", item.value);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        item.value === field.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <FormDescription>This is the language that will be used in the dashboard.</FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>
}

export default FormSelect