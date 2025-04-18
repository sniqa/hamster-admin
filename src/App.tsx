import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserPage from "./pages/user/UserPage";
import DevicePage from "./pages/device/DevicePage";
import Table from "./pages/Table";
import MainLayout from "./components/layout/MainLayout";
import NetworkPage from "./pages/network/NetworkPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "home", element: <></> },
      // { path: "network", element: <NetworkPage /> },
      // {
      //   path: "order",
      //   element: <WorkOrderPage />,
      // },
      {
        path: "user",
        element: <UserPage />,
      },
      { path: "/device", element: <DevicePage /> },
      { path: "/network", element: <NetworkPage /> },
    ],
  },
  { path: "/table", element: <Table /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
