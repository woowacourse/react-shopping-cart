import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  NavBar,
  ShoppingCart,
  Products,
  OrderPayment,
  CompletedOrder,
} from './components';
import { ROUTE } from './constants';
import GlobalStyle from './global.styles';
import rootReducer from './reducers';

const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Router>
        <NavBar />
        <Route exact path={[ROUTE.HOME, ROUTE.PRODUCTS]} component={Products} />
        <Route exact path={ROUTE.CART} component={ShoppingCart} />
        <Route exact path={ROUTE.ORDER_PAYMENT} component={OrderPayment} />
        <Route exact path={ROUTE.COMPLETED_ORDER} component={CompletedOrder} />
      </Router>
    </Provider>
  );
}

export default App;
