import { Suspense } from "react";
import { SidebarProvider } from "../ui/sidebar";
import NavSidebar from "./NavSidebar";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const MainLayout = () => {
  return (
    <SidebarProvider>
      <NavSidebar />
      <main className="w-full h-full">
        <Header />

        <Suspense>
          <Outlet />
        </Suspense>
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
