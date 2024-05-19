import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ShoppingCartOverview from './components/ShoppingCartOverview/ShoppingCartOverview';
import OrderInfo from './components/OrderInfo/OrderInfo';
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
        path: ROUTER_URLS.ORDER_INFO,
        element: <OrderInfo />,
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
