import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  NavBar,
  ShoppingCart,
  Products,
  OrderPayment,
  Details,
  CompletedOrder,
  ErrorBoundary,
} from './components';
import { PersistGate } from 'redux-persist/integration/react';
import { ROUTE } from './constants';
import GlobalStyle from './global.styles';
import OrderDetails from './components/pages/OrderDetails';
import { configureStore } from './store';

const { store, persistor } = configureStore();
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyle />
        <Router>
          <ErrorBoundary>
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
              path={'/order-details/:order_id'}
              render={props => <OrderDetails {...props} />}
            />
          </ErrorBoundary>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
