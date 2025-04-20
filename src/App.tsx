import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserPage from "./pages/user/UserPage";
import DevicePage from "./pages/device/DevicePage";
import Table from "./pages/Table";
import MainLayout from "./components/layout/MainLayout";
import NetworkPage from "./pages/network/NetworkPage";
import Login from "./pages/user/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "home", element: <></> },

      {
        path: "user",
        element: <UserPage />,
      },
      { path: "/device", element: <DevicePage /> },
      { path: "/network", element: <NetworkPage /> },
    ],
  },
  { path: "/table", element: <Table /> },
  { path: "/login", element: <Login /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
