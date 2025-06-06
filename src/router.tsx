import { createBrowserRouter } from "react-router";

import Layout from "./Layout";

import ShoppingCartPage from "./pages/ShoppingCartPage/ShoppingCartPage";
import OrderCheckPage from "./pages/OrderCheckPage/OrderCheckPage";
import PaymentAmountCheckPage from "./pages/PaymentAmountCheckPage/PaymentAmountCheckPage";

export const routes = [
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ShoppingCartPage />,
      },
      {
        path: "/payment-amount-check",
        element: <PaymentAmountCheckPage />,
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
