import { createBrowserRouter } from "react-router-dom";
import ShoppingCart from "./pages/ShoppingCart";
import CheckOrder from "./pages/CheckOrder";
import { ErrorBoundary } from "react-error-boundary";
import NetworkError from "./components/Error/NetworkError";
import CompleteOrder from "./pages/CompleteOrder";
import { Suspense } from "react";
import LoadingSpinner from "./components/common/LoadingSpinner";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: (
          <ErrorBoundary FallbackComponent={NetworkError}>
            <Suspense fallback={<LoadingSpinner />}>
              <ShoppingCart />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: "/check-order",
        element: (
          <ErrorBoundary FallbackComponent={NetworkError}>
            <Suspense fallback={<LoadingSpinner />}>
              <CheckOrder />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: "/complete-order",
        element: (
          <ErrorBoundary FallbackComponent={NetworkError}>
            <Suspense fallback={<LoadingSpinner />}>
              <CompleteOrder />
            </Suspense>
          </ErrorBoundary>
        ),
      },
    ],
  },
]);

export default router;
