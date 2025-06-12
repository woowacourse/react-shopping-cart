import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/@common/layout/Layout";
import CartPage from "../pages/cartPage/CartPage";
import OrderCompletePage from "../pages/orderCompletePage/OrderCompletePage";
import { ROUTE } from "../constants/systemConstants";
import OrderConfirmationPage from "../pages/orderConfirmationPage/OrderConfirmationPage";

const router = createBrowserRouter([
  {
    path: ROUTE.CART,
    element: <Layout />,
    children: [
      {
        path: ROUTE.CART,
        element: <CartPage />,
      },
      {
        path: ROUTE.ORDER_CONFIRMATION,
        element: <OrderConfirmationPage />,
      },
      {
        path: ROUTE.ORDER_COMPLETE,
        element: <OrderCompletePage />,
      },
    ],
  },
]);

export default router;
