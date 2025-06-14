import { createBrowserRouter, RouterProvider } from 'react-router';

import OrderCheckPage from './pages/OrderCheckPage/OrderCheck';
import CartPage from './pages/CartPage/CartPage';
import PriceCheckPage from './pages/PriceCheckPage/PriceCheck';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <CartPage />,
    },
    {
      path: '/order-check',
      element: <OrderCheckPage />,
    },
    {
      path: '/price-check',
      element: <PriceCheckPage />,
    },
  ],
  {
    basename:
      process.env.NODE_ENV === 'production' ? '/react-shopping-cart' : '',
  }
);

export default function Route() {
  return <RouterProvider router={router} />;
}
