import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import * as S from "./App.styled";

import Nav from "./components/Nav/Nav";
import SnackBar from "./components/MessageSnackBar/SnackBar";

import ProductsList from "./components/ProductsList/ProductsList";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Cart from "./components/Cart/Cart";
import Payment from "./components/Payment/Payment";
import OrdersList from "./components/OrdersList/OrdersList";

import { ROUTE } from "./constants/constant";

const App = () => (
  <S.App>
    <BrowserRouter>
      <SnackBar />
      <Nav />
      <S.Main>
        <Switch>
          <Route exact path={ROUTE.HOME} component={ProductsList} />
          <Route exact path={ROUTE.PRODUCT_DETAIL} component={ProductDetail} />
          <Route exact path={ROUTE.CART} component={Cart} />
          <Route exact path={ROUTE.PAYMENT} component={Payment} />
          <Route exact path={ROUTE.ORDERS_LIST} component={OrdersList} />

          <Redirect path="*" to="/" />
        </Switch>
      </S.Main>
    </BrowserRouter>
  </S.App>
);
export default App;
