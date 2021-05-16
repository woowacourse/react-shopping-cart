import React, { VFC } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Header from "./Components/Header";
import ProductList from "./Pages/ProductList";
import Cart from "./Pages/Cart";
import Order from "./Pages/Order";
import { PATH } from "./constants/path";


const App: VFC = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Switch>
        <Route exact path={PATH.HOME}>
          <ProductList />
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
