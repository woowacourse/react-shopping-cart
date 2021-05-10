import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Global, ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import Styled, { globalStyle, theme } from './App.styles';
import BaseLayout from './components/layout/BaseLayout/BaseLayout';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import CartPage from './pages/CartPage/CartPage';
import OrderPage from './pages/OrderPage/OrderPage';
import OrderCompletePage from './pages/OrderCompletePage/OrderCompletePage';
import OrderListPage from './pages/OrderListPage/OrderListPage';
import rootReducer from './modules';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <BaseLayout>
            <Global styles={globalStyle} />
            <Styled.Page>
              <Switch>
                <Route exact path="/">
                  <ProductsPage />
                </Route>
                <Route path="/products">
                  <ProductsPage />
                </Route>
                <Route path="/cart">
                  <CartPage />
                </Route>
                <Route exact path="/order">
                  <OrderPage />
                </Route>
                <Route path="/order/complete">
                  <OrderCompletePage />
                </Route>
                <Route path="/order-list">
                  <OrderListPage />
                </Route>
              </Switch>
            </Styled.Page>
          </BaseLayout>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
