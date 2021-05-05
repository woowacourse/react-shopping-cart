import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Navigation from './components/navigation/Navigation';
import ProductList from './pages/ProductList';
import ShoppingCart from './pages/ShoppingCart';
import OrderList from './pages/OrderList';
import GlobalStyle from './GlobalStyle';
import styled from 'styled-components';

const StyledContents = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Navigation />
      <StyledContents>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/productList">
            <ProductList />
          </Route>
          <Route exact path="/shoppingCart">
            <ShoppingCart />
          </Route>
          <Route exact path="/orderList">
            <OrderList />
          </Route>
        </Switch>
      </StyledContents>
    </>
  );
}

export default App;
