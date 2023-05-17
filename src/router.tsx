import { createBrowserRouter } from 'react-router-dom';
import CartPage from './pages/CartPage';
import ProductListPage from './pages/ProductListPage';
import Root from './pages/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <ProductListPage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
    ],
  },
]);

export default router;
