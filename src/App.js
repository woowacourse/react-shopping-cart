import React, { useEffect } from 'react';
import styled from 'styled-components';
import GlobalStyle from './GlobalStyle';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ShoppingCart from './pages/ShoppingCart';
import OrderList from './pages/OrderList';
import OrderPayment from './pages/OrderPayment';
import OrderListDetail from './pages/OrderListDetail';
import ProductDetail from './pages/ProductDetail';
import { getShoppingCartItemList } from './redux/actions/shoppingCartActions';
import { Navigation } from './components';
import { PATH } from './constants/path';
import { COLOR } from './constants/color';

const StyledContents = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 40px 60px 0 60px;
`;

const App = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const isOrderPage = pathname.includes(PATH.ORDER_LIST);

  useEffect(() => {
    dispatch(getShoppingCartItemList());
  }, [dispatch]);

  return (
    <>
      <GlobalStyle backgroundColor={isOrderPage ? COLOR.GRAY_150 : COLOR.WHITE} />
      <Navigation />
      <StyledContents>
        <Switch>
          <Route exact path={PATH.HOME}>
            <Home />
          </Route>
          <Route exact path={PATH.PRODUCT_LIST}>
            <ProductList />
          </Route>
          <Route exact path={`${PATH.PRODUCT_LIST}/:id`}>
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
          <Route exact path={`${PATH.ORDER_LIST}/:id`}>
            <OrderListDetail />
          </Route>
        </Switch>
      </StyledContents>
    </>
  );
};

export default App;
