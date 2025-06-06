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
      path: "/payment-complete",
      element: <PaymentComplete />,
    },
    {
      path: "/order-confirm",
      element: <OrderConfirm />,
    },
  ],
  {
    basename: "/react-shopping-cart",
    // basename은 배포 시에 사용되는 경로를 지정합니다.
  }
);
