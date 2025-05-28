import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/layout/Layout";
import CartPage from "../pages/cartPage/CartPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <CartPage />,
      },
      {
        path: "/order-complete",
      },
    ],
  },
]);

export default router;
