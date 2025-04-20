import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { ReactNode } from "react";

const TableRowActionsMenu = ({
  children,
  label,
}: {
  children: ReactNode;
  label?: ReactNode;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {label && <DropdownMenuLabel>{label}</DropdownMenuLabel>}
        <DropdownMenuItem>{children}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableRowActionsMenu;
