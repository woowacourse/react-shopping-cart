import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import * as S from "./App.styled";
import Nav from "./components/@mixins/Nav/Nav";
import Cart from "./components/Cart/Cart";
import ProductsList from "./components/ProductsList/ProductsList";
import Payment from "./Payment/Payment";

const App = () => (
  <S.App>
    <BrowserRouter>
      <Nav />
      <S.Main>
        <Switch>
          <Route exact path="/" component={ProductsList} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/payment" component={Payment} />
          <Redirect path="*" to="/" />
        </Switch>
      </S.Main>
    </BrowserRouter>
  </S.App>
);

export default App;
