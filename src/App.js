import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Navigation from './components/navigation/Navigation';
import ProductList from './pages/ProductList';
import ShoppingCart from './pages/ShoppingCart';
import OrderList from './pages/OrderList';
import GlobalStyle from './GlobalStyle';
import styled from 'styled-components';
import OrderPayment from './pages/OrderPayment';
import { fetchProductList } from './modules/product';
import { useDispatch } from 'react-redux';

const StyledContents = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 60px;
  margin-top: 40px;
`;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getProductList = async () => {
      const response = await fetch('http://localhost:4000/products');
      const result = await response.json();

      dispatch(fetchProductList(result));
    };

    getProductList();
  }, [dispatch]);

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
          <Route exact path="/orderPayment">
            <OrderPayment />
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
