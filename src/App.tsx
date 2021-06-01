import React, { VFC } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import { Header } from "./Components";
import ProductList from "./Pages/ProductList";
import Cart from "./Pages/Cart";
import Order from "./Pages/Order";
import { PATH } from "./constants/path";
import ProductDetail from "./Pages/ProductDetail";

const NAVIGATION = [
  { path: PATH.CART, name: "장바구니" },
  { path: PATH.ORDER_LIST, name: "주문목록" },
];

const App: VFC = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header navigation={NAVIGATION} />
      <Switch>
        <Route exact path={PATH.HOME}>
          <ProductList />
        </Route>
        <Route path={`${PATH.HOME}/:id`}>
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
