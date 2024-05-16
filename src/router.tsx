import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { CartPage } from "./pages/cartPage/CartPage";
import { OrderConfirmationPage } from "./pages/orderConfirmationPage/OrderConfirmationPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <CartPage />,
        },
        {
          path: "/order-confirmation",
          element: <OrderConfirmationPage />,
        },
      ],
    },
  ],
  { basename: "/react-shopping-cart/" }
);

export default router;
