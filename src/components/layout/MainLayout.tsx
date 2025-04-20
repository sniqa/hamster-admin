import { Suspense, useEffect } from "react";
import { SidebarProvider } from "../ui/sidebar";
import NavSidebar from "./NavSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useUserContext } from "@/userContext";

const MainLayout = () => {
  const { token } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return (
    <SidebarProvider>
      <NavSidebar />
      <main className="w-full h-full flex flex-col">
        <Header />

        <div
          // style={{ height: "calc(100vh - 4rem)" }}
          className="overflow-hidden w-full box-border h-full"
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
