import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/layout/Layout";
import CartPage from "../pages/cartPage/CartPage";
import OrderCompletePage from "../pages/orderCompletePage/OrderCompletePage";
import { ROUTE } from "../constants/systemConstants";
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
        path: ROUTE.ORDER_COMPLETE,
        element: <OrderCompletePage />,
      },
    ],
  },
]);

export default router;
