import { createBrowserRouter } from 'react-router-dom';
import { ENDPOINT } from './router.constants';
import { ShoppingCartPage, ConfirmOrderPage } from '../page';

export const router = createBrowserRouter(
  [
    {
      index: true,
      path: ENDPOINT.shoppingCart,
      element: <ShoppingCartPage />,
    },
    {
      path: ENDPOINT.confirmOrder,
      element: <ConfirmOrderPage />,
    },
  ],
  {
    basename: ENDPOINT.baseUrl,
  },
);

export default router;
