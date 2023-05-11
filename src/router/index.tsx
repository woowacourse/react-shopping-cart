import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Main from "../pages/Main";

export const ROUTER_PATH = {
  Main: "/",
};

export const PageRouterProvider = () => {
  const router = createBrowserRouter([
    {
      path: ROUTER_PATH.Main,
      element: <Main />,
    },
  ]);
  return <RouterProvider router={router} />;
};
