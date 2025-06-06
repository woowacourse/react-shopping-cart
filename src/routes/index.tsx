import { createBrowserRouter, RouterProvider } from "react-router";
import App from "../App";
import PaymentConfirmPage from "../pages/PaymentConfirmPage";
import OrderConfirmPage from "../pages/OrderConfirmPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
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
