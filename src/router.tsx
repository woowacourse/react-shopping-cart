import { createBrowserRouter } from "react-router-dom";
import ShoppingCart from "./pages/ShoppingCart";
import CheckOrder from "./pages/CheckOrder";
import { ErrorBoundary } from "react-error-boundary";
import NetworkError from "./components/Error/NetworkError";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: (
          <ErrorBoundary FallbackComponent={NetworkError}>
            <ShoppingCart />
          </ErrorBoundary>
        ),
      },
      {
        path: "/check-order",
        element: <CheckOrder />,
      },
    ],
  },
]);

export default router;
