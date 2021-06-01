import { useEffect, useState } from 'react';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';
import {
  NavBar,
  ShoppingCart,
  Products,
  OrderPayment,
  Details,
  CompletedOrder,
} from './components';
import product from './reducers/products';
import history from './reducers';
import { ROUTE } from './constants';
import GlobalStyle from './global.styles';
import thunk from 'redux-thunk';
import OrderDetails from './components/pages/OrderDetails';

const reducer = combineReducers({
  product,
  history,
});

const store = createStore(reducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Router>
        <NavBar />
        <Route
          exact
          path={[ROUTE.HOME, ROUTE.PRODUCTS]}
          render={props => <Products {...props} />}
        />
        <Route
          path={ROUTE.CART}
          render={props => <ShoppingCart {...props} />}
        />
        <Route
          path={ROUTE.ORDER_PAYMENT}
          render={props => <OrderPayment {...props} />}
        />
        <Route
          path={'/product/:product_id'}
          render={props => <Details {...props} />}
        />
        <Route
          path={'/completed-order'}
          render={props => <CompletedOrder {...props} />}
        />
        <Route
          path={'/order-details'}
          render={props => <OrderDetails {...props} />}
        />
      </Router>
    </Provider>
  );
}

export default App;
