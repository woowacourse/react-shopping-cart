import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../App";
import CartPage from "../pages/CartPage";
import OrderConfirmPage from "../pages/OrderConfirmPage";
import PaymentConfirmationPage from "../pages/PaymentConfirmationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <CartPage />,
      },
    ],
  },
  {
    path: "/orderConfirm",
    element: <OrderConfirmPage />,
  },
  {
    path: "/paymentConfirm",
    element: <PaymentConfirmationPage />,
  },
], {
  basename: "/react-shopping-cart/dist",
}
);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
