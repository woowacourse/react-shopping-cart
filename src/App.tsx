import { useEffect } from 'react';
import { Route, Switch } from 'react-router';
import ErrorBoundary from './components/ErrorBoundary';
import NavigationBar from './components/NavigationBar';
import useFetchCartRedux from './hooks/useFetchCartRedux';
import OrderConfirmPage from './pages/OrderConfirmPage';
import OrderListPage from './pages/OrderListPage';
import ProductListPage from './pages/ProductListPage';
import ShoppingCartPage from './pages/ShoppingCartPage';

function App() {
  const { doFetch } = useFetchCartRedux();

  useEffect(() => {
    doFetch();
  }, []);

  return (
    <div className="App">
      <NavigationBar />
      <ErrorBoundary>
        <Switch>
          <Route path="/" exact component={ProductListPage} />
          <Route path="/shoppingCart" component={ShoppingCartPage} />
          <Route path="/orderList" component={OrderListPage} />
          <Route path="/orderConfirm" component={OrderConfirmPage} />
        </Switch>
      </ErrorBoundary>
    </div>
  );
}

export default App;
