import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ProductListPage, CartPage, CheckoutPage } from './pages';
import { Page, NavBar } from './commons';
import { ROUTE } from '../constants';

export const App = () => {
  return (
    <Router>
      <NavBar />
      <Page>
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
        </Switch>
      </Page>
    </Router>
  );
};
