import { createBrowserRouter } from 'react-router-dom';

import { CartPage, HomePage, OrderPage } from '@/b_pages';

import { baseLayout } from './layouts/BaseLayout';

export const appRouter = () =>
  createBrowserRouter([
    {
      element: baseLayout,
      errorElement: <div>error</div>,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/cart',
          element: <CartPage />,
        },
        {
          path: '/order',
          element: <OrderPage />,
        },
      ],
    },
  ]);
