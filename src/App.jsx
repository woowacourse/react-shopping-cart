import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import GlobalStyles from 'styles/globalStyles';

import { ROUTE } from 'constants';
import { addCartItem } from 'reduxModule/cart';

import Layout from 'components/common/Layout';
import ProductList from 'components/Pages/ProductList';
import ProductDetail from 'components/Pages/ProductDetail';
import NotFound from 'components/Pages/NotFound';
import Cart from 'components/Pages/Cart';

const App = () => {
  const dispatch = useDispatch();
  const onAddCartButtonClick = (id) => {
    if (window.confirm('상품을 장바구니에 담으시겠습니까?')) {
      dispatch(addCartItem(id));
    }
  };

  return (
    <div>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path={ROUTE.HOME}
            element={<ProductList onAddCartButtonClick={onAddCartButtonClick} />}
          />
          <Route
            path={ROUTE.DETAIL_PRODUCT}
            element={<ProductDetail onAddCartButtonClick={onAddCartButtonClick} />}
          />
          <Route path={ROUTE.CART} element={<Cart />} />
          <Route path={ROUTE.EXCEPT} element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
