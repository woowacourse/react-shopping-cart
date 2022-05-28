import { Routes, Route } from 'react-router-dom';

import CartList from 'pages/CartList';
import NotFound from 'pages/NotFound';
import ProductList from 'pages/ProductList';

import Layout from 'components/Layout';

import { PAGE_LIST } from 'constants/';

function PageRoute() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<ProductList />} />
        <Route path={PAGE_LIST.PRODUCT_LIST} element={<ProductList />} />
        <Route path={PAGE_LIST.CART_LIST} element={<CartList />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default PageRoute;
