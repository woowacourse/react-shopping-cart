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
import { getShoppingCartItemList } from './redux/actions/shoppingCartActions';
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
    dispatch(getShoppingCartItemList());
  }, [dispatch]);

  return (
    <>
      <GlobalStyle />
      <Navigation />
      <StyledContents>
        <Switch>
          <Route exact path={PATH.HOME} component={Home} />
          <Route path={PATH.PRODUCT_LIST} component={ProductList} />
          <Route path={PATH.PRODUCT_DETAIL} component={ProductDetail} />
          <Route path={PATH.SHOPPING_CART} component={ShoppingCart} />
          <Route path={PATH.ORDER_PAYMENT} component={OrderPayment} />
          <Route path={PATH.ORDER_LIST} component={OrderList} />
          <Route path={PATH.ORDER_LIST_DETAIL} component={OrderListDetail} />
        </Switch>
      </StyledContents>
    </>
  );
};

export default App;
