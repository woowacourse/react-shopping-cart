import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ProductListPage, ProductDetailPage, CartPage, CheckoutPage, OrderListPage } from './pages';
import { Confirm, NavBar } from './components';
import { useConfirm } from './hooks';
import { ROUTE } from './constants';

export const App = () => {
  const { isOpened, message, onApprove, onCancle } = useConfirm();

  return (
    <Router>
      <NavBar />
      <Confirm isOpened={isOpened} message={message} onApprove={onApprove} onClose={onCancle} />
      <Switch>
        <Route exact path={[ROUTE.HOME, ROUTE.PRODUCT_LIST]}>
          <ProductListPage />
        </Route>
        <Route path={`${ROUTE.PRODUCT_DETAIL}/:id`}>
          <ProductDetailPage />
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
