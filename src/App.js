import './App.css';

import { Route, Switch } from 'react-router-dom';

import Header from '../src/components/Header';
import ProductListPage from '../src/pages/ProductListPage';
import OrderListPage from '../src/pages/OrderListPage';
import CartPage from '../src/pages/CartPage';
import PaymentPage from '../src/pages/PaymentPage';
import NotFoundPage from '../src/pages/NotFoundPage';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path={['/', '/products']} component={ProductListPage} />
        <Route exact path="/orders" component={OrderListPage} />
        <Route path="/cart" component={CartPage} />
        <Route path="/payment" component={PaymentPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
