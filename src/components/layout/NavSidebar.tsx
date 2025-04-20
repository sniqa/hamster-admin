import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Home, User, Settings, MonitorSmartphone, Network } from "lucide-react";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { CONSTANT } from "@/lib/constant";

const items = [
  {
    title: CONSTANT.HOME,
    url: "/home",
    icon: Home,
  },
  {
    title: CONSTANT.USER,
    url: "/user",
    icon: User,
  },
  {
    title: CONSTANT.DEVICE,
    url: "/device",
    icon: MonitorSmartphone,
  },
  {
    title: CONSTANT.NETWORK,
    url: "/network",
    icon: Network,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

const NavSidebar = () => {
  const { open, toggleSidebar } = useSidebar();

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <div
          className={`flex items-center overflow-hidden gap-4 cursor-pointer`}
          onClick={toggleSidebar}
        >
          <Avatar className={`transition-all ${open ? "size-14" : "size-8"}`}>
            <AvatarImage src="/03.png" />
            <AvatarFallback>hamster</AvatarFallback>
          </Avatar>
          <span>Hamster</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{CONSTANT.NAVIGATION}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton asChild>
                          <a href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default NavSidebar;
