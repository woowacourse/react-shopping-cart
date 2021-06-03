import React, { VFC } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import { Header } from "./components";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import { PATH } from "./constants/path";
import ProductDetail from "./pages/ProductDetail";

const NAVIGATION = [{ path: PATH.CART, name: "장바구니" }];

const App: VFC = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header navigation={NAVIGATION} />
      <Switch>
        <Route exact path={PATH.HOME}>
          <ProductList />
        </Route>
        <Route path={`${PATH.PRODUCT}/:id`}>
          <ProductDetail />
        </Route>
        <Route exact path={PATH.CART}>
          <Cart />
        </Route>
        <Route exact path={PATH.ORDER}>
          <Order />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
