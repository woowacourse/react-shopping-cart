import { createBrowserRouter } from 'react-router-dom';

import CartPage from './pages/CartPage';
import OrderConfirmPage from './pages/OrderConfirmPage';
import PurchaseConfirmPage from './pages/PurchaseConfirmPage';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      children: [
        {
          index: true,
          element: <CartPage />,
        },
        {
          path: 'confirm',
          element: <OrderConfirmPage />,
        },
        {
          path: 'completed',
          element: <PurchaseConfirmPage />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);
