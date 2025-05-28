import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Cart from "./pages/Cart/Cart";
import OrderSummary from "./pages/OrderSummary/OrderSummary";

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
    ],
  },
]);

export default router;
