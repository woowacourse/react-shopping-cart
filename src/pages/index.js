import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ProductListPage } from './ProductListPage';
import { CartPage } from './CartPage';
import { CheckoutPage } from './CheckoutPage';
import { OrderListPage } from './OrderListPage';
import { Confirm, NavBar } from '../components';
import { ROUTE } from '../constants';
import { useConfirm } from '../hooks';

export const App = () => {
  const { isOpen, message, onCancel, onApprove } = useConfirm();

  return (
    <Router>
      <NavBar />
      <Confirm isOpen={isOpen} message={message} onCancel={onCancel} onApprove={onApprove} />
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
