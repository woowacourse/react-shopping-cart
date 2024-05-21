import { createBrowserRouter } from 'react-router-dom';

import GeneralLayout from './layouts/GeneralLayout';
import CartConfirmPage from './pages/CartConfirmPage';
import CartPage from './pages/CartPage';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <GeneralLayout />,
      children: [
        {
          index: true,
          element: <CartPage />,
        },
        {
          path: 'confirm',
          element: <CartConfirmPage />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);
