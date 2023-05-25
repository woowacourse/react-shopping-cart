import { createBrowserRouter } from 'react-router-dom';

import ProductListPage from './components/page/ProductListPage';
import CartPage from './components/page/CartPage';

const routes = [
  {
    path: '/',
    element: <ProductListPage />,
  },
  {
    path: '/cart',
    element: <CartPage />,
  },
];

export default createBrowserRouter(routes);
