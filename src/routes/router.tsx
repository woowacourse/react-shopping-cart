import { createBrowserRouter } from "react-router-dom";

import { PAGE_URL } from "../constants/url.ts";
import PaymentConfirmPage from "../pages/PaymentConfimPage/PaymentConfirmPage.tsx";
import OrderConfirmDataLoader from "../pages/OrderConfirmPage/OrderConfirmDataLoader.tsx";
import CartPageDataLoader from "@/pages/CartPage/CartPageDataLoader.tsx";
import { Suspense } from "react";

const router = createBrowserRouter([
  {
    path: PAGE_URL.home,
    element: (
      <Suspense>
        <CartPageDataLoader />
      </Suspense>
    ),
  },
  {
    path: PAGE_URL.orderConfirm,
    element: (
      <Suspense>
        <OrderConfirmDataLoader />
      </Suspense>
    ),
  },
  {
    path: PAGE_URL.paymentConfirm,
    element: (
      <Suspense>
        <PaymentConfirmPage />
      </Suspense>
    ),
  },
]);

export default router;
