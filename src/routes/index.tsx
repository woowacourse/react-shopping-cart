import { createBrowserRouter, RouterProvider } from "react-router";
import App from "../App";
import OrderConfirmPage from "../pages/OrderConfirmPage";
import PaymentConfirmPage from "../pages/PaymentConfirmPage";

const router = createBrowserRouter([
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
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
