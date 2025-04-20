import {
  DropdownMenu,
  DropdownMenuContent,
  //   DropdownMenuGroup,
  DropdownMenuItem,
  //   DropdownMenuLabel,
  //   DropdownMenuPortal,
  //   DropdownMenuSeparator,
  DropdownMenuShortcut,
  //   DropdownMenuSub,
  //   DropdownMenuSubContent,
  //   DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserContext } from "@/userContext";

export function UserAvatar() {
  const { removeToken, user } = useUserContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            // src="、"
            alt="@shadcn"
            className="size-12"
          />
          <AvatarFallback>{user?.username || ""}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-42">
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuItem onClick={removeToken}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
