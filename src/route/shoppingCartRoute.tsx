import { createBrowserRouter } from "react-router-dom";
import { ShoppingCart } from "../domains/shopping-cart/page/shoppingCart";
import { PaymentComplete } from "../domains/paymentComplete/page/PaymentComplete";

export const shoppingCartRoute = createBrowserRouter(
  [
    {
      path: "/",
      element: <ShoppingCart />,
      errorElement: <div>페이지를 찾을 수 없습니다. (404)</div>,
    },
    {
      path: "/payment-complete",
      element: <PaymentComplete />,
    },
  ],
  {
    basename: "/react-shopping-cart",
  }
);
