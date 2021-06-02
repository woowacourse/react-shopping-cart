import React, { FC } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Header from "./Components/Header";
import ProductList from "./Pages/ProductList";
import Cart from "./Pages/Cart";
import Order from "./Pages/Order";
import { RootState } from "./store";
import SnackBar from "./Components/SnackBar";

const App: FC = () => {
  const alertMessages = useSelector((state: RootState) => state.alert);

  return (
    <>
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
    <SnackBar messages={alertMessages} />
    </>
  );
};

export default App;
