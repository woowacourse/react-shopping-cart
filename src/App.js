import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Navigation from './components/navigation/Navigation';
import ProductList from './pages/ProductList';
import ShoppingCart from './pages/ShoppingCart';
import OrderList from './pages/OrderList';
import GlobalStyle from './GlobalStyle';
import styled from 'styled-components';
import OrderPayment from './pages/OrderPayment';

const StyledContents = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 60px;
  margin-top: 40px;
`;

function App() {
  const [productListState, setProductListState] = useState(null);

  useEffect(() => {
    const getProductList = async () => {
      const response = await fetch('http://localhost:4000/products');
      const result = await response.json();

      setProductListState(result);
    };

    getProductList();
  }, []);

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
            <ProductList productListState={productListState} />
          </Route>
          <Route exact path="/shoppingCart">
            <ShoppingCart productListState={productListState} />
          </Route>
          <Route exact path="/orderList">
            <OrderList />
          </Route>
          <Route exact path="/orderPayment">
            <OrderPayment productListState={productListState} />
          </Route>
        </Switch>
      </StyledContents>
    </>
  );
}

export default App;
