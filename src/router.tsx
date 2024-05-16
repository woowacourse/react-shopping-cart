import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/components/layout/MainLayout";

import OrderConfirmPage from "@/pages/OrderConfirmPage/OrderConfirmPage";
import CartPage from "@/pages/CartPage/CartPage";

import { PAGE_URL } from "./constants/url";

const router = createBrowserRouter([
  {
    path: PAGE_URL.home,
    element: <MainLayout />,
    children: [
      {
        path: PAGE_URL.home,
        element: <CartPage />,
      },
      {
        path: PAGE_URL.orderConfirm,
        element: <OrderConfirmPage />,
      },
    ],
  },
]);

export default router;
