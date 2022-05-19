import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GlobalStyles from 'styles/globalStyles';

import Layout from 'components/common/Layout';
import ProductList from 'components/ProductList';
import ProductDetail from 'components/ProductDetail';
import NotFound from 'components/NotFound';
import Cart from 'components/Cart';

import { ROUTE } from 'constants';
import { useDispatch } from 'react-redux';
import { addCartItem, minusCartItem } from 'modules/cart';

const App = () => {
  const dispatch = useDispatch();
  const onAddCartButtonClick = (id) => {
    dispatch(addCartItem(id));
  };

  const onMinusCartButtonClick = (id) => {
    dispatch(minusCartItem(id));
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
          <Route
            path={ROUTE.CART}
            element={
              <Cart
                onAddCartButtonClick={onAddCartButtonClick}
                onMinusCartButtonClick={onMinusCartButtonClick}
              />
            }
          />
          <Route path={ROUTE.EXCEPT} element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
