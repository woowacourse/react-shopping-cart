import { createBrowserRouter } from 'react-router-dom';

import { App } from '@/App';
import { CartPage } from '@/pages/CartPage';
import { OrderCheckoutPage } from '@/pages/OrderCheckoutPage';
import { OrderConfirmPage } from '@/pages/OrderConfirmPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/cart',
        element: <CartPage />,
      },
      {
        path: '/order-checkout',
        element: <OrderCheckoutPage />,
      },
      {
        path: '/order-confirm',
        element: <OrderConfirmPage />,
      },
    ],
  },
]);
