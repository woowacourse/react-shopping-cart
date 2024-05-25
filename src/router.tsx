import { createBrowserRouter } from "react-router-dom";

import { PAGE_URL } from "./constants/url";

import CartPage from "./pages/CartPage/CartPage";
import PaymentConfirmPage from "./pages/PaymentConfimPage/PaymentConfirmPage";
import OrderConfirmDataLoader from "./pages/OrderConfirmPage/OrderConfirmDataLoader";

const router = createBrowserRouter([
  {
    path: PAGE_URL.home,
    element: <CartPage />,
  },
  {
    path: PAGE_URL.orderConfirm,
    element: <OrderConfirmDataLoader />,
  },
  {
    path: PAGE_URL.paymentConfirm,
    element: <PaymentConfirmPage />,
  },
]);

export default router;
