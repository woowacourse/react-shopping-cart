import { createBrowserRouter } from 'react-router-dom';
import ProductList from 'pages/ProductList';
import CartList from 'pages/CartList';
import NotFound from 'pages/NotFound';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <ProductList />,
      errorElement: <NotFound />,
    },
    {
      path: '/cart',
      element: <CartList />,
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

export default router;
