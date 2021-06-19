import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import ShoppingCart from './components/common/Icon/ShoppingCart';
import Header from './components/Header';
import Navigation from './components/Navigation';
import CartPage from './components/pages/CartPage';
import CheckoutPage from './components/pages/CheckoutPage';
import OrdersPage from './components/pages/OrdersPage';
import ProductListPage from './components/pages/ProductListPage';
import { HEADER, PAGES } from './constants/appInfo';

const App = () => {
  return (
    <Router>
      <Header logo={<ShoppingCart />} title={HEADER.APP_TITLE}>
        <Navigation navList={HEADER.NAV_LIST} />
      </Header>
      <Switch>
        <Route path={PAGES.PRODUCT.address} exact>
          <ProductListPage />
        </Route>
        <Route path={PAGES.CART.address}>
          <CartPage />
        </Route>
        <Route path={PAGES.CHECKOUT.address}>
          <CheckoutPage />
        </Route>
        <Route path={PAGES.ORDERS.address}>
          <OrdersPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
