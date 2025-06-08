import { createBrowserRouter, Outlet } from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import OrderSummary from "./pages/OrderSummary/OrderSummary";
import OrderComplete from "./pages/OrderComplete/OrderComplete";

const basename =
  import.meta.env.MODE === "production" ? "/react-shopping-cart/" : "/";

const router = createBrowserRouter(
  [
    {
      element: <Outlet />,
      children: [
        {
          path: "/",
          element: <Cart />,
        },
        {
          path: "/summary",
          element: <OrderSummary />,
        },
        {
          path: "/orderComplete",
          element: <OrderComplete />,
        },
      ],
    },
  ],
  {
    basename,
  }
);

export default router;
