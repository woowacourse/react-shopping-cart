import { createBrowserRouter, RouterProvider } from "react-router";
import PaymentConfirmPage from "../pages/PaymentConfirmPage";
import OrderConfirmPage from "../pages/OrderConfirmPage";
import CartItemPage from "../pages/CartItemPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <CartItemPage />,
    },
    {
      path: "/order-confirm",
      element: <OrderConfirmPage />,
    },
    {
      path: "/payment-confirm",
      element: <PaymentConfirmPage />,
    },
  ],
  {
    basename: "/react-shopping-cart/",
  }
);

export default function Router() {
  return <RouterProvider router={router} />;
}
