import { createBrowserRouter, RouterProvider } from 'react-router';

import OrderCheckPage from './pages/OrderCheckPage/OrderCheckPage';
import CartPage from './pages/CartPage/CartPage';

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
  ],
  {
    basename:
      import.meta.env.MODE === 'production' ? '/react-shopping-cart' : '/',
  }
);

export default function Route() {
  return <RouterProvider router={router} />;
}
