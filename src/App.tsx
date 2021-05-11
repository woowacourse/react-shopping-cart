import React, { VFC } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Header from "./Components/Header";
import ProductList from "./Pages/ProductList";
import Cart from "./Pages/Cart";
import Order from "./Pages/Order";

const App: VFC = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Switch>
        <Route exact path="/">
          <ProductList />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/order">
          <Order />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
