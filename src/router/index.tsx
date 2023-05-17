import { createBrowserRouter } from 'react-router-dom';
import CartList from 'src/pages/CartList';
import ProductList from 'src/pages/ProductList';

const CartRouter = createBrowserRouter(
  [
    {
      path: '/',
      element: <ProductList />,
    },
    {
      path: '/cart-list',
      element: <CartList />,
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

export default CartRouter;
