import { createBrowserRouter } from "react-router-dom";

import CartPage from "../pages/CartPage";
import OrderConfirmationPage from "../pages/OrderConfirmationPage";
import PaymentConfirmationPage from "../pages/PaymentConfirmationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CartPage />,
  },
  {
    path: "/orderConfirmation",
    element: <OrderConfirmationPage />,
  },
  {
    path: "/paymentConfirmation",
    element: <PaymentConfirmationPage />,
  },
]);

export default router;
