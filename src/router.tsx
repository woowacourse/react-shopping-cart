import { createBrowserRouter } from "react-router-dom";
import ShoppingCart from "./pages/ShoppingCart";
import CheckOrder from "./pages/CheckOrder";
import CompleteOrder from "./pages/CompleteOrder";
import ErrorAndSuspense from "./components/common/ErrorAndSuspense";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: (
          <ErrorAndSuspense>
            <ShoppingCart />
          </ErrorAndSuspense>
        ),
      },
      {
        path: "/check-order",
        element: (
          <ErrorAndSuspense>
            <CheckOrder />
          </ErrorAndSuspense>
        ),
      },
      {
        path: "/complete-order",
        element: (
          <ErrorAndSuspense>
            <CompleteOrder />
          </ErrorAndSuspense>
        ),
      },
    ],
  },
]);

export default router;
