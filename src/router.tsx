import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ShoppingCartOverview from './components/ShoppingCartOverview/ShoppingCartOverview';
import PaymentInfo from './components/PaymentInfo/PaymentInfo.tsx';
import { ROUTER_URLS } from './constants/constants';
import ProductList from './components/Admin/ProductList/ProductList';
import InvalidAccessFallback from './components/InvalidAccessFallback/InvalidAccessFallback';

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
