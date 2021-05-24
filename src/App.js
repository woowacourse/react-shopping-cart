import React from 'react';
import GlobalStyle from './GlobalStyle';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ShoppingCart from './pages/ShoppingCart';
import OrderList from './pages/OrderList';
import OrderPayment from './pages/OrderPayment';
import OrderListDetail from './pages/OrderListDetail';
import ProductDetail from './pages/ProductDetail';
import { Navigation } from './components';
import { PATH } from './constants/path';

const App = () => (
  <>
    <GlobalStyle />
    <Navigation />
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
  </>
);

export default App;
