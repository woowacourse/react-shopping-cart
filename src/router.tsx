import { createBrowserRouter } from "react-router-dom";
import ShoppingCart from "./pages/ShoppingCart";
import CheckOrder from "./pages/CheckOrder";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <ShoppingCart />,
      },
      {
        path: "/check-order",
        element: <CheckOrder />,
      },
    ],
  },
]);

export default router;
