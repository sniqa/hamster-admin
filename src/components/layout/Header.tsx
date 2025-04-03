import { useScrollTop } from "@/hooks/use-scroll-top";
import { SidebarTrigger } from "../ui/sidebar";
import ThemeSwitch from "@/components/ThemeSwitch";
const Header = () => {
  const offset = useScrollTop();
  return (
    <header
      className={`h-16 flex items-center px-2 justify-between ${
        offset > 10 ? "sticky top-0 z-40 shadow" : ""
      }`}
    >
      <SidebarTrigger variant={"outline"} className="cursor-pointer" />
      <div className="">
        <ThemeSwitch />
      </div>
    </header>
  );
};

export default Header;
