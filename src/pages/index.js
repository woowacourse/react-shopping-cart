import { ROUTE } from 'route';

import Home from 'pages/Home/Home';
import OrderList from 'pages/OrderList/OrderList';
import ProductDetail from 'pages/ProductDetail/ProductDetail';
import ShoppingCart from 'pages/ShoppingCart/ShoppingCart';
import NotFound from './NotFound/NotFound';

export const PAGES = {
  [ROUTE.home.path]: <Home />,
  [ROUTE.shoppingCart.path]: <ShoppingCart />,
  [ROUTE.orderList.path]: <OrderList />,
  [ROUTE.productDetail.path]: <ProductDetail />,
  '/*': <NotFound />,
};
