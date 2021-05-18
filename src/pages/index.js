import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { confirmAction } from '../redux';
import { ProductListPage } from './ProductListPage';
import { CartPage } from './CartPage';
import { CheckoutPage } from './CheckoutPage';
import { OrderListPage } from './OrderListPage';
import { Confirm, NavBar } from '../components';
import { ROUTE } from '../constants';

export const App = () => {
  const { isOpen, message, approve } = useSelector(({ confirmReducer }) => confirmReducer);

  const dispatch = useDispatch();
  const close = () => dispatch(confirmAction.closeConfirm());
  const onCancel = () => close();
  const onApprove = () => {
    approve();
    close();
  };

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
