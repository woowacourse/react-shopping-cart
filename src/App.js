import React from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Navigation from './components/Navigation';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductListPage from './pages/ProductListPage';
import ShoppingCart from './components/common/Icon/ShoppingCart';

import { HEADER, PAGES } from './constants/appInfo';

const App = () => {
  return (
    <Router>
      <Header logo={<ShoppingCart />} title={HEADER.APP_TITLE}>
        <Navigation navList={HEADER.NAV_LIST} />
      </Header>
      <Switch>
        <Route path={PAGES.HOME.ADDRESS} exact>
          <Redirect to={{ pathname: PAGES.PRODUCT.ADDRESS, state: { from: PAGES.HOME.ADDRESS } }} />
        </Route>
        <Route path={PAGES.PRODUCT.ADDRESS}>
          <ProductListPage />
        </Route>
        <Route path={PAGES.PRODUCT_DETAIL.ADDRESS}>
          <ProductDetailPage />
        </Route>
        <Route path={PAGES.CART.ADDRESS}>
          <CartPage />
        </Route>
        <Route path={PAGES.CHECKOUT.ADDRESS}>
          <CheckoutPage />
        </Route>
        <Route path={PAGES.ORDERS.ADDRESS}>
          <OrdersPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
