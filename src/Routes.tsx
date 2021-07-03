import React, { ReactElement } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import CartPage from './pages/CartPage/CartPage';
import OrderPage from './pages/OrderPage/OrderPage';
import OrderCompletePage from './pages/OrderCompletePage/OrderCompletePage';
import OrderListPage from './pages/OrderListPage/OrderListPage';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';

const Routes = (): ReactElement => {
  return (
    <Switch>
      <Route exact path="/">
        <ProductsPage />
      </Route>
      <Route exact path="/products">
        <ProductsPage />
      </Route>
      <Route path="/product/:id">
        <ProductDetailPage />
      </Route>
      <Route path="/cart">
        <CartPage />
      </Route>
      <Route exact path="/order">
        <OrderPage />
      </Route>
      <Route path="/order/complete">
        <OrderCompletePage />
      </Route>
      <Route path="/order-list">
        <OrderListPage />
      </Route>
      <Redirect to="/" path="*" />
    </Switch>
  );
};

export default Routes;
