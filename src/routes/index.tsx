import { createBrowserRouter, RouterProvider } from "react-router";
import App from "../App";
import OrderConfirmPage from "../pages/OrderConfirmPage";
import PaymentConfirmPage from "../pages/PaymentConfirmPage";
import { ErrorFallbackPage } from "../pages/ErrorFallbackPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorFallbackPage />,
  },
  {
    path: "/order-confirm",
    element: <OrderConfirmPage />,
    errorElement: <ErrorFallbackPage />,
  },
  {
    path: "/payment-confirm",
    element: <PaymentConfirmPage />,
    errorElement: <ErrorFallbackPage />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
