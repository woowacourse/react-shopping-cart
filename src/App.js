import { useEffect, useState } from 'react';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  NavBar,
  ShoppingCart,
  Products,
  OrderPayment,
  Details,
  CompletedOrder,
} from './components';
import product from './reducers/products';
import { ROUTE } from './constants';
import GlobalStyle from './global.styles';
import thunk from 'redux-thunk';

const reducer = combineReducers({
  product,
});

const store = createStore(reducer, applyMiddleware(thunk));

function App() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

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
          exact
          path={ROUTE.CART}
          render={props => <ShoppingCart {...props} />}
        />
        <Route
          exact
          path={ROUTE.ORDER_PAYMENT}
          render={props => <OrderPayment {...props} />}
        />
        <Route
          exact
          path={'/product/:product_id'}
          render={props => <Details {...props} />}
        />
        <Route
          exact
          path={'/completed-order'}
          render={props => <CompletedOrder orders={orders} {...props} />}
        />
      </Router>
    </Provider>
  );
}

export default App;
