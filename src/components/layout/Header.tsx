import { useScrollTop } from "@/hooks/use-scroll-top";
import { SidebarTrigger } from "../ui/sidebar";
import ThemeSwitch from "@/components/ThemeSwitch";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CONSTANT } from "@/lib/constant";
import { UserAvatar } from "./UserAvatar";

const Header = () => {
  const offset = useScrollTop();

  return (
    <header
      className={`h-16 flex items-center px-4 justify-between box-border ${
        offset > 10 ? "sticky top-0 z-40 shadow" : ""
      }`}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarTrigger variant={"outline"} className="cursor-pointer" />
          </TooltipTrigger>
          <TooltipContent>
            <p>{CONSTANT.TOGGLE_SIDEBAR}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="flex justify-center items-center gap-4">
        <ThemeSwitch />

        <UserAvatar />
      </div>
    </header>
  );
};

export default Header;
