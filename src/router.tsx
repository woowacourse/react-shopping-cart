import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/components/layout/MainLayout";

import OrderConfirmPage from "@/pages/OrderConfirmPage/OrderConfirmPage";
import CartPage from "@/pages/CartPage/CartPage";

import { PAGE_URL } from "./constants/url";
import { TITLES } from "./constants/cart";

const router = createBrowserRouter([
  {
    path: PAGE_URL.home,
    element: (
      <MainLayout type="title" title={TITLES.cart}>
        <CartPage />
      </MainLayout>
    ),
  },
  {
    path: PAGE_URL.orderConfirm,
    element: (
      <MainLayout type="backButton">
        <OrderConfirmPage />
      </MainLayout>
    ),
  },
]);

export default router;
