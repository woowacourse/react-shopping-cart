import Main from "./pages/Main";
import CartPage from "./pages/CartPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./layout";
import { PAGES } from "./constants";

const router = createBrowserRouter(
  [
    {
      path: PAGES.HOME,
      element: <Main />,
    },
    {
      path: PAGES.CART,
      element: <CartPage />,
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

export const App = () => {
  return <RouterProvider router={router} />;
};
