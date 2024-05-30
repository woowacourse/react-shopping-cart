import { createBrowserRouter } from 'react-router-dom';

import { CartPage, HomePage, OrderPage } from '@/b_pages';
import { urls } from '@/f_shared';

import { baseLayout } from './layouts/BaseLayout';

export const appRouter = () =>
  createBrowserRouter([
    {
      element: baseLayout,
      errorElement: <div>error</div>,
      children: [
        {
          path: urls.root,
          element: <HomePage />,
        },
        {
          path: urls.cart,
          element: <CartPage />,
        },
        {
          path: urls.order,
          element: <OrderPage />,
        },
      ],
    },
  ]);
