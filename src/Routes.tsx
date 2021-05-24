import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProductsPage from 'pages/ProductsPage/ProductsPage';
import CartPage from 'pages/CartPage/CartPage';
import OrderPage from 'pages/OrderPage/OrderPage';
import ProductDetailPage from 'pages/ProductDetailPage/ProductDetailPage';
import OrderCompletePage from 'pages/OrderCompletePage/OrderCompletePage';
import OrderListPage from 'pages/OrderListPage/OrderListPage';
import OrderDetailPage from 'pages/OrderDetailPage/OrderDetailPage';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={ProductsPage} />
      <Route exact path="/products" component={ProductsPage} />
      <Route path="/products/detail" component={ProductDetailPage} />
      <Route path="/cart" component={CartPage} />
      <Route exact path="/order" component={OrderPage} />
      <Route path="/order/complete" component={OrderCompletePage} />
      <Route path="/order/list" component={OrderListPage} />
      <Route path="/order/detail" component={OrderDetailPage} />
    </Switch>
  );
};

export default Routes;
