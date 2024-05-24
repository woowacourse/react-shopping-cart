import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { ROUTER_URLS } from './constants/constants';

import { ShoppingCartOverview, OrderInfo, PaymentInfo, ProductList } from '@pages/index.ts';
import InvalidAccessFallback from '@components/fallback/InvalidAccessFallback/InvalidAccessFallback.tsx';

const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        index: true,
        path: ROUTER_URLS.MAIN,
        element: <ShoppingCartOverview />,
      },
      {
        path: ROUTER_URLS.ORDER_INFO,
        element: <OrderInfo />,
        errorElement: <InvalidAccessFallback />,
      },
      {
        path: ROUTER_URLS.PAYMENT_INFO,
        element: <PaymentInfo />,
        errorElement: <InvalidAccessFallback />,
      },
      {
        path: ROUTER_URLS.ADMIN,
        element: <ProductList />,
      },
    ],
    errorElement: <InvalidAccessFallback />,
  },
]);

export default router;
