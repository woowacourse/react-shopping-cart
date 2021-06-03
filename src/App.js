import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  NavBar,
  ShoppingCart,
  Products,
  OrderPayment,
  CompletedOrder,
  ProductDetail,
} from './components';
import { ROUTE } from './constants';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Route exact path={[ROUTE.HOME, ROUTE.PRODUCTS]} component={Products} />
      <Route exact path={ROUTE.PRODUCT_DETAIL} component={ProductDetail} />
      <Route exact path={ROUTE.CART} component={ShoppingCart} />
      <Route exact path={ROUTE.ORDER_PAYMENT} component={OrderPayment} />
      <Route exact path={ROUTE.COMPLETED_ORDER} component={CompletedOrder} />
    </Router>
  );
};

export default App;
