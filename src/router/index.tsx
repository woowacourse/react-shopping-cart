import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Main from "../pages/Main";
import NotFound from "../pages/NotFound";

export const ROUTER_PATH = {
  Main: "/",
  NotFound: "/*",
};

export const PageRouterProvider = () => {
  const router = createBrowserRouter([
    {
      path: ROUTER_PATH.Main,
      element: <Main />,
    },
    { path: ROUTER_PATH.NotFound, errorElement: <NotFound /> },
  ]);
  return <RouterProvider router={router} />;
};
