import React, { VFC } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Header from "./Components/Header";
import ProductList from "./pages/ProductList";

const App: VFC = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Switch>
        <Route exact path="/">
          <ProductList />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
