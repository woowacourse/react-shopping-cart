import { createBrowserRouter } from "react-router";

import Layout from "./Layout";

import ShoppingCartPage from "./pages/ShoppingCartPage/ShoppingCartPage";
import PaymentAmountCheckPage from "./pages/PaymentAmountCheckPage/PaymentAmountCheckPage";
import OrderCheckPage from "./pages/OrderCheckPage/OrderCheckPage";
import OrderSuccessPage from "./pages/OrderSuccessPage/OrderSuccessPage";

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
      {
        path: "/order-success",
        element: <OrderSuccessPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);
export default router;
