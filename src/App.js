import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './pages/Main';
import Navigation from './components/navigation/Navigation';
import ProductList from './pages/ProductList';
import ShoppingCart from './pages/ShoppingCart';
import OrderList from './pages/OrderList';
import GlobalStyle from './GlobalStyle';

function App() {
  return (
    <>
      <GlobalStyle />
      <Navigation />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/productList">
          <ProductList />
        </Route>
        <Route exact path="/shoppingCart">
          <ShoppingCart />
        </Route>
        <Route exact path="/orderList">
          <OrderList />
        </Route>
      </Switch>
    </>
  );
}

export default App;
