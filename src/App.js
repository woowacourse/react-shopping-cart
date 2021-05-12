import React, { useEffect } from 'react';
import styled from 'styled-components';
import GlobalStyle from './GlobalStyle';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ShoppingCart from './pages/ShoppingCart';
import OrderList from './pages/OrderList';
import OrderPayment from './pages/OrderPayment';
import OrderListDetail from './pages/OrderListDetail';
import ProductDetail from './pages/ProductDetail';
import { fetchProductList } from './modules/product';
import { fetchShoppingCartList } from './modules/shoppingCart';
import { getOrderItemList } from './modules/orderList';
import { Navigation } from './components';
import { PATH } from './constants/path';

const StyledContents = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 60px;
  margin-top: 40px;
`;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductList());
    dispatch(fetchShoppingCartList());
    dispatch(getOrderItemList());
  }, [dispatch]);

  return (
    <>
      <GlobalStyle />
      <Navigation />
      <StyledContents>
        <Switch>
          <Route exact path={PATH.HOME}>
            <Home />
          </Route>
          <Route path={PATH.PRODUCT_LIST}>
            <ProductList />
          </Route>
          <Route path={PATH.PRODUCT_DETAIL}>
            <ProductDetail />
          </Route>
          <Route path={PATH.SHOPPING_CART}>
            <ShoppingCart />
          </Route>
          <Route path={PATH.ORDER_PAYMENT}>
            <OrderPayment />
          </Route>
          <Route path={PATH.ORDER_LIST}>
            <OrderList />
          </Route>
          <Route path={PATH.ORDER_LIST_DETAIL}>
            <OrderListDetail />
          </Route>
        </Switch>
      </StyledContents>
    </>
  );
};

export default App;
