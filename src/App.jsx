import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import ProvidePayment from "./components/ProvidePayment/ProvidePayment";
import Nav from "./components/@mixins/Nav/Nav";
import ProductsList from "./components/ProductsList/ProductsList";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Cart from "./components/Cart/Cart";
import Payment from "./components/Payment/Payment";
import OrdersList from "./components/OrdersList/OrdersList";
import * as S from "./App.styled";

const App = () => (
  <S.App>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Nav />
      <S.Main>
        <Switch>
          <Route exact path="/" component={ProductsList} />
          <Route path="/product/:productId" component={ProductDetail} />
          <Route exact path="/orders-list" component={OrdersList} />
          <ProvidePayment>
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/payment" component={Payment} />
          </ProvidePayment>
          <Redirect path="*" to="/" />
        </Switch>
      </S.Main>
    </BrowserRouter>
  </S.App>
);

export default App;
