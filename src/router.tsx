import { createBrowserRouter } from "react-router";
import ShoppingCartPage from "./pages/ShoppingCartPage/ShoppingCartPage";
import OrderCheckPage from "./pages/OrderCheckPage/OrderCheckPage";
import Layout from "./Layout";

export const routes = [
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ShoppingCartPage />,
      },
      {
        path: "/order-check",
        element: <OrderCheckPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);
export default router;
