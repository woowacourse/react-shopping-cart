import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import * as S from "./App.styled";
import Nav from "./components/@mixins/Nav/Nav";
import ProductsList from "./components/ProductsList/ProductsList";

const App = () => (
  <S.App>
    <Nav />
    <S.Main>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ProductsList} />
          <Redirect path="*" to="/" />
        </Switch>
      </BrowserRouter>
    </S.Main>
  </S.App>
);

export default App;
