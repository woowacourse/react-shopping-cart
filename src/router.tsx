import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Cart from "./pages/Cart/Cart";
import OrderSummary from "./pages/OrderSummary/OrderSummary";

const basename =
  import.meta.env.MODE === "production" ? "/react-shopping-cart/" : "/";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
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
    basename, // ✅ 이 부분 추가
  }
);

export default router;
