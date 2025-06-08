import { createBrowserRouter } from "react-router-dom";
import { ShoppingCart } from "../domains/shopping-cart/page/shoppingCart";
import { PaymentComplete } from "../domains/paymentComplete/page/PaymentComplete";
import NotFoundPage from "../page/NotFoundPage";
import OrderConfirm from "../domains/orderConfirm/page/orderConfirm";

export const shoppingCartRoute = createBrowserRouter(
  [
    {
      path: "/",
      element: <ShoppingCart />,
      errorElement: <NotFoundPage />,
    },
    {
      path: "/order-confirm",
      element: <OrderConfirm />,
      errorElement: <NotFoundPage />,
    },
    {
      path: "/payment-complete",
      element: <PaymentComplete />,
      errorElement: <NotFoundPage />,
    },
  ],
  {
    basename: "/react-shopping-cart",
  }
);
