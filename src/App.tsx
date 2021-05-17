import { FC, useEffect } from 'react';
import { Route, Switch } from 'react-router';
import NavigationBar from './components/NavigationBar';
import useFetchCartRedux from './hooks/useFetchCartRedux';
import OrderConfirmPage from './pages/OrderConfirmPage';
import OrderListPage from './pages/OrderListPage';
import ProductListPage from './pages/ProductListPage';
import ShoppingCartPage from './pages/ShoppingCartPage';

const App: FC = () => {
  return (
    <div className="App">
      <NavigationBar />
      <Switch>
        <Route path="/" exact component={ProductListPage} />
        <Route path="/shoppingCart" component={ShoppingCartPage} />
        <Route path="/orderList" component={OrderListPage} />
        <Route path="/orderConfirm" component={OrderConfirmPage} />
      </Switch>
    </div>
  );
};

export default App;
