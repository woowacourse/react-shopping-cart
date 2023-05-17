import { createBrowserRouter } from 'react-router-dom';

import ProductListPage from './components/pages/ProductListPage';
import CartPage from './components/pages/CartPage';

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
