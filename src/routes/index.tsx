import { createBrowserRouter } from "react-router-dom";
import CartPage from "../pages/CartPage";
import OrderConfirmationPage from "../pages/OrderConfirmationPage";
import PaymentConfirmationPage from "../pages/PaymentConfirmationPage";
import { fetchCartItems } from "../api/cartItemApi";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CartPage />,
    // loader: async () => {
    //   const cartItems = await fetchCartItems();
    //   console.log("cartItems 호출", cartItems);
    //   return { cartItems };
    // },
  },
  {
    path: "/orderConfirmation",
    element: <OrderConfirmationPage />,
  },
  {
    path: "/paymentConfirmation",
    element: <PaymentConfirmationPage />,
  },
]);

export default router;
