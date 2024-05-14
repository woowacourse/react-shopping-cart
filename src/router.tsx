import { createBrowserRouter } from 'react-router-dom';

import CartConfirmPage from './pages/CartConfirmPage';
import CartPage from './pages/CartPage';

export const router = createBrowserRouter([
  {
    path: '/',
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
]);
