import { createBrowserRouter } from "react-router-dom";

import CartPage from "@/pages/CartPage/CartPage";
import OrderConfirmPage from "@/pages/OrderConfirmPage/OrderConfirmPage";
import PaymentConfirmPage from "./pages/PaymentConfirmPage/PaymentConfirmPage";

import MainLayout from "./components/_layout/MainLayout/MainLayout";

import CLIENT_PATH from "./constants/path";

const router = createBrowserRouter([
  {
    path: CLIENT_PATH.home,
    element: <MainLayout />,
    children: [
      {
        path: CLIENT_PATH.home,
        element: <CartPage />,
      },
      {
        path: CLIENT_PATH.orderConfirm,
        element: <OrderConfirmPage />,
      },
      {
        path: CLIENT_PATH.paymentConfirm,
        element: <PaymentConfirmPage />,
      },
    ],
  },
]);

export default router;
