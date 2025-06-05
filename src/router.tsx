import { createBrowserRouter, Outlet } from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import OrderSummary from "./pages/OrderSummary/OrderSummary";

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
      ],
    },
  ],
  {
    basename,
  }
);

export default router;
