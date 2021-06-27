import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { RootState } from "./store";
import GlobalStyles from "./GlobalStyles";

import Header from "./Components/Header";
import SnackBar from "./Components/SnackBar";
import ProductList from "./Pages/ProductList";
import Cart from "./Pages/Cart";
import Order from "./Pages/Order";
import ProductDetail from "./Pages/ProductDetail";
import OrderLog from "./Pages/OrderLog";
import OrderLogDetail from "./Pages/OrderLogDetail";

const App = () => {
  const alertMessages = useSelector((state: RootState) => state.alert);

  return (
    <>
      <BrowserRouter>
        <GlobalStyles />
        <Header />
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route exact path="/products" component={ProductDetail} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/order" component={Order} />
          <Route exact path="/orderlog" component={OrderLog} />
          <Route exact path="/order-detail" component={OrderLogDetail} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
      <SnackBar messages={alertMessages} />
    </>
  );
};

export default App;
