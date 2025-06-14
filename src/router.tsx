import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Cart from "./pages/Cart/Cart";
import OrderSummary from "./pages/OrderSummary/OrderSummary";
import OrderComplete from "./pages/OrderComplete/OrderComplete";

const router = createBrowserRouter([
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
      {
        path: "/order-complete",
        element: <OrderComplete />,
      },
    ],
  },
]);

export default router;
