import { createBrowserRouter } from "react-router-dom";
import CartPage from "../pages/CartPage";
import OrderConfirmationPage from "../pages/OrderConfirmationPage";
import PaymentConfirmationPage from "../pages/PaymentConfirmationPage";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CartPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/orderConfirmation",
    element: <OrderConfirmationPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/paymentConfirmation",
    element: <PaymentConfirmationPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/error",
    element: <ErrorPage />,
  },
]);

export default router;
