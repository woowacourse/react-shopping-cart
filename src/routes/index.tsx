import { createBrowserRouter, RouterProvider } from 'react-router';

import OrderCheckPage from './pages/OrderCheckPage/OrderCheckPage';
import CartPage from './pages/CartPage/CartPage';
import OrderCompletePage from './pages/OrderCompletePage/OrderCompletePage';

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
      path: '/order-complete',
      element: <OrderCompletePage />,
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
