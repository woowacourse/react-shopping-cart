import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { CartPage } from './pages/cartPage/CartPage';
import { OrderConfirmationPage } from './pages/orderConfirmationPage/OrderConfirmationPage';
import { PaymentsConfirmationPage } from './pages/paymentsConfirmationPage/PaymentsConfirmationPage';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <CartPage />,
        },
        {
          path: '/order-confirmation',
          element: <OrderConfirmationPage />,
        },
        {
          path: 'payments-confirmation',
          element: <PaymentsConfirmationPage />,
        },
      ],
    },
  ],
  { basename: '/react-shopping-cart/' },
);

export default router;
