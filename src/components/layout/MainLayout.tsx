import { Suspense } from "react";
import { SidebarProvider } from "../ui/sidebar";
import NavSidebar from "./NavSidebar";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const MainLayout = () => {
  return (
    <SidebarProvider>
      <NavSidebar />
      <main className="w-full h-full flex flex-col">
        <Header />

        <div
          style={{ height: "calc(100vh - 4rem)" }}
          className="overflow-auto w-full box-border"
        >
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
