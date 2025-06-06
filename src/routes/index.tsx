import { createBrowserRouter, RouterProvider } from "react-router";
import App from "../App";
import PaymentConfirmPage from "../pages/PaymentConfirmPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/order-confirm",
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
