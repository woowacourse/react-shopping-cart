import { createBrowserRouter } from 'react-router-dom';
import CartPage from './pages/CartPage';
import ErrorPage from './pages/ErrorPage';
import ProductListPage from './pages/ProductListPage';
import RootPage from './pages/RootPage';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootPage />,
      errorElement: <ErrorPage />,
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
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);

export default router;
