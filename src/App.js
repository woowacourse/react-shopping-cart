import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Navigation from './components/navigation/Navigation';
import ProductList from './pages/ProductList';
import ShoppingCart from './pages/ShoppingCart';
import OrderList from './pages/OrderList';
import GlobalStyle from './GlobalStyle';
import styled from 'styled-components';
import OrderPayment from './pages/OrderPayment';
import { fetchProductList } from './modules/product';
import { useDispatch } from 'react-redux';
import { fetchShoppingCartList } from './modules/shoppingCart';
import OrderListDetail from './pages/OrderListDetail';
import ProductDetail from './pages/ProductDetail';
import { getOrderItemList } from './modules/orderList';
import { PATH } from './constants/path';

const StyledContents = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 60px;
  margin-top: 40px;
`;

function App() {
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
          <Route exact path={PATH.PRODUCT_LIST}>
            <ProductList />
          </Route>
          <Route exact path={PATH.PRODUCT_DETAIL}>
            <ProductDetail />
          </Route>
          <Route exact path={PATH.SHOPPING_CART}>
            <ShoppingCart />
          </Route>
          <Route exact path={PATH.ORDER_PAYMENT}>
            <OrderPayment />
          </Route>
          <Route exact path={PATH.ORDER_LIST}>
            <OrderList />
          </Route>
          <Route exact path={PATH.ORDER_LIST_DETAIL}>
            <OrderListDetail />
          </Route>
        </Switch>
      </StyledContents>
    </>
  );
}

export default App;
