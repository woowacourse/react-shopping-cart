import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Main from "pages/Main";
import NotFound from "pages/NotFound";
import Cart from "pages/Cart";

export const ROUTER_PATH = {
  Main: "/",
  Cart: "/cart",
  NotFound: "/*",
};

export const PageRouterProvider = () => {
  const router = createBrowserRouter([
    {
      path: ROUTER_PATH.Main,
      element: <Main />,
    },
    {
      path: ROUTER_PATH.Cart,
      element: <Cart />,
    },
    { path: ROUTER_PATH.NotFound, element: <NotFound /> },
  ]);
  return <RouterProvider router={router} />;
};
