import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ProductListPage, CartPage, CheckoutPage, OrderListPage } from './pages';
import { NavBar } from './commons';
import { ROUTE } from '../constants';

export const App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path={[ROUTE.HOME, ROUTE.PRODUCT_LIST]}>
          <ProductListPage />
        </Route>
        <Route path={ROUTE.CART}>
          <CartPage />
        </Route>
        <Route path={ROUTE.CHECKOUT}>
          <CheckoutPage />
        </Route>
        <Route path={ROUTE.ORDER_LIST}>
          <OrderListPage />
        </Route>
      </Switch>
    </Router>
  );
};
