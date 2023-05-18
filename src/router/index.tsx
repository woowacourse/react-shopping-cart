import { createBrowserRouter } from 'react-router-dom';
import ProductList from 'pages/ProductList';
import CartList from 'pages/CartList';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <ProductList />,
    },
    {
      path: '/cart',
      element: <CartList />,
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

export default router;
