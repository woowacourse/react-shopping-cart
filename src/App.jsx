import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import ProvidePayment from "./components/ProvidePayment/ProvidePayment";
import Nav from "./components/@mixins/Nav/Nav";
import Product from "./pages/Product/Product";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Cart from "./pages/Cart/Cart";
import Payment from "./pages/Payment/Payment";
import Order from "./pages/Order/Order";

import * as S from "./App.styled";
import PATH from "./constants/path";

const App = () => (
  <S.App>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Nav />
      <S.Main>
        <Switch>
          <Route exact path={[PATH.PRODUCT, PATH.HOME]}>
            <Product />
          </Route>
          <Route path={PATH.PRODUCT_DETAIL}>
            <ProductDetail />
          </Route>
          <Route exact path={PATH.ORDER}>
            <Order />
          </Route>
          <ProvidePayment>
            <Route exact path={PATH.CART}>
              <Cart />
            </Route>
            <Route exact path={PATH.PAYMENT}>
              <Payment />
            </Route>
          </ProvidePayment>
          <Redirect path="*" to={PATH.HOME} />
        </Switch>
      </S.Main>
    </BrowserRouter>
  </S.App>
);

export default App;
