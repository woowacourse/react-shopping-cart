import { createBrowserRouter, RouterProvider } from "react-router";
import App from "../App";
import OrderConfirmPage from "../pages/OrderConfirmPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/order-confirm",
    element: <OrderConfirmPage />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
