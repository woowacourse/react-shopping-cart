import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { PATHS } from "./constants";
import { CartPage } from "./pages/cartPage/CartPage";
<<<<<<< HEAD
import { PaymentsConfirmationPage } from "./pages/paymentsConfirmationPage/PaymentsConfirmationPage";
=======
>>>>>>> 00kang
import { OrderConfirmationPage } from "./pages/orderConfirmationPage/OrderConfirmationPage";

const router = createBrowserRouter(
  [
    {
      path: PATHS.BASE,
      element: <App />,
      children: [
        {
          index: true,
          element: <CartPage />,
        },
        {
          path: PATHS.ORDER_CONFIRMATION,
          element: <OrderConfirmationPage />,
        },
<<<<<<< HEAD
        {
          path: PATHS.PAYMENTS_CONFIRMATION,
          element: <PaymentsConfirmationPage />,
        },
=======
>>>>>>> 00kang
      ],
    },
  ],
  { basename: PATHS.SHOPPING_CART }
);

export default router;
