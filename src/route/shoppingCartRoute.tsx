import { createBrowserRouter } from "react-router-dom";
import OrderConfirm from "../domains/orderConfirm/page/orderConfirm";
import { PaymentComplete } from "../domains/paymentComplete/page/PaymentComplete";
import { ShoppingCart } from "../domains/shopping-cart/page/shoppingCart";
import NotFoundPage from "../page/NotFoundPage";

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
