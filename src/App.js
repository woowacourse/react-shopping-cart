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
import { reactFamily, reactFamilyOrders } from './mockData';

const App = () => {
  return (
    <Router>
      <Header logo={<ShoppingCart />} title={HEADER.APP_TITLE}>
        <Navigation navList={HEADER.NAV_LIST} />
      </Header>
      <Switch>
        <Route path={PAGES.PRODUCT.ADDRESS} exact>
          <ProductListPage products={reactFamily} />
        </Route>
        <Route path={PAGES.CART.ADDRESS}>
          <CartPage products={reactFamily.map((item) => ({ ...item, amount: 1, isChecked: false }))} />
        </Route>
        <Route path={PAGES.CHECKOUT.ADDRESS}>
          <CheckoutPage products={reactFamily.map((item) => ({ ...item, amount: 1 }))} />
        </Route>
        <Route path={PAGES.ORDERS.ADDRESS}>
          <OrdersPage orders={reactFamilyOrders} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
