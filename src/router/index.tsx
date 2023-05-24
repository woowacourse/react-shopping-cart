import { createBrowserRouter } from 'react-router-dom';
import ShoppingBasket from 'src/pages/ShoppingBasket';
import ProductList from 'src/pages/ProductList';
import { PATH } from 'src/utils/constants';

const CartRouter = createBrowserRouter(
  [
    {
      path: PATH.HOME,
      element: <ProductList />,
    },
    {
      path: PATH.SHOPPING_BASKET,
      element: <ShoppingBasket />,
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

export default CartRouter;
