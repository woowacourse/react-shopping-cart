import { createBrowserRouter } from "react-router";

import Layout from "./Layout";

import ShoppingCartPage from "./pages/ShoppingCartPage/ShoppingCartPage";
import PaymentAmountCheckPage from "./pages/PaymentAmountCheckPage/PaymentAmountCheckPage";
import OrderCheckPage from "./pages/OrderCheckPage/OrderCheckPage";
import OrderSuccessPage from "./pages/OrderSuccessPage/OrderSuccessPage";

export const DEFAULT_URL = "/react-shopping-cart";

export const routes = [
  {
    element: <Layout />,
    children: [
      {
        path: DEFAULT_URL,
        element: <ShoppingCartPage />,
      },
      {
        path: `${DEFAULT_URL}/payment-amount-check`,
        element: <PaymentAmountCheckPage />,
      },
      {
        path: `${DEFAULT_URL}/order-check`,
        element: <OrderCheckPage />,
      },
      {
        path: `${DEFAULT_URL}/order-success`,
        element: <OrderSuccessPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);
export default router;
