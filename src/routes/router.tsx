import { createBrowserRouter } from "react-router-dom";

import { PAGE_URL } from "../constants/url.ts";
import PaymentConfirmPage from "../pages/PaymentConfimPage/PaymentConfirmPage.tsx";
import OrderConfirmDataLoader from "../pages/OrderConfirmPage/OrderConfirmDataLoader.tsx";
import CartPage from "@/pages/CartPage/CartPage.tsx";
import { Suspense } from "react";
import CartPageSkeleton from "@/pages/Skeleton/CartPage.skeleton.tsx";

const router = createBrowserRouter([
  {
    path: PAGE_URL.home,
    element: (
      <Suspense fallback={<CartPageSkeleton />}>
        <CartPage />
      </Suspense>
    ),
  },
  {
    path: PAGE_URL.orderConfirm,
    element: (
      <Suspense fallback={<CartPageSkeleton />}>
        <OrderConfirmDataLoader />
      </Suspense>
    ),
  },
  {
    path: PAGE_URL.paymentConfirm,
    element: <PaymentConfirmPage />,
  },
]);

export default router;
