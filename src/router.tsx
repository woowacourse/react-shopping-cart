import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { CartPage } from "./pages/CartPage";
import { OrderConfirmationPage } from "./pages/OrderConfirmationPage";

const router = createBrowserRouter([
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
]);

export default router;
