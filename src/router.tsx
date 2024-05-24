import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/components/layout/MainLayout";

import { PAGE_URL } from "./constants/url";
import { CART_PAGE_TITLES } from "./constants/cart";
import CartPageSkeleton from "./pages/CartPage/CartPage.skeleton";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./pages/Error/ErrorPage";
import CartPage from "./pages/CartPage/CartPage";
import PaymentConfirmPage from "./pages/PaymentConfimPage/PaymentConfirmPage";
import OrderConfirmDataLoader from "./pages/OrderConfirmPage/OrderConfirmDataLoader";

const router = createBrowserRouter([
  {
    path: PAGE_URL.home,
    element: (
      <MainLayout
        type="title"
        title={CART_PAGE_TITLES.cart}
        fallback={<CartPageSkeleton />}
      >
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <CartPage />
        </ErrorBoundary>
      </MainLayout>
    ),
  },
  {
    path: PAGE_URL.orderConfirm,
    element: (
      <MainLayout type="backButton">
        <OrderConfirmDataLoader />
      </MainLayout>
    ),
  },
  {
    path: PAGE_URL.paymentConfirm,
    element: (
      <MainLayout type="title" title={""} fallback={<CartPageSkeleton />}>
        <PaymentConfirmPage />
      </MainLayout>
    ),
  },
]);

export default router;
