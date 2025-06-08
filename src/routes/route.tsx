import { createBrowserRouter } from 'react-router-dom';

import { App } from '@/App';
import { CartPage } from '@/pages/CartPage';
import { OrderCheckoutPage } from '@/pages/OrderCheckoutPage';
import { OrderConfirmPage } from '@/pages/OrderConfirmPage';
import { NotFound } from '@/shared/components/NotFound';

const isGitHubPages =
  process.env.NODE_ENV === 'production' && window.location.hostname.includes('github.io');

export const router = createBrowserRouter(
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
    {
      path: '*',
      element: <NotFound />,
    },
  ],
  {
    basename: isGitHubPages ? '/react-shopping-cart' : '',
  }
);
