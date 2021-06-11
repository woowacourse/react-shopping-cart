import { useEffect, VFC } from 'react';
import { Route, Switch } from 'react-router';
import { ErrorBoundary } from 'react-error-boundary';

import NavigationBar from './components/NavigationBar';
import useCart from './service/hooks/useCart';
import OrderConfirmPage from './pages/OrderConfirmPage';
import OrderListPage from './pages/OrderListPage';
import ProductListPage from './pages/ProductListPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductListErrorFallback from './components/ProductList/ErrorFallback';
import OrderListErrorFallback from './components/OrderList/ErrorFallback';
import ProductDetailErrorFallback from './components/ProductDetail/ErrorFallback';

const App: VFC = () => {
  const { fetchCartItems } = useCart();

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="App">
      <NavigationBar />
      <Switch>
        <Route path="/" exact>
          <ErrorBoundary FallbackComponent={ProductListErrorFallback}>
            <ProductListPage />
          </ErrorBoundary>
        </Route>
        <Route path="/shoppingCart">
          <ShoppingCartPage />
        </Route>
        <Route path="/orderList">
          <ErrorBoundary FallbackComponent={OrderListErrorFallback}>
            <OrderListPage />
          </ErrorBoundary>
        </Route>
        <Route path="/orderConfirm" component={OrderConfirmPage} />
        <Route path="/product/:productId">
          <ErrorBoundary FallbackComponent={ProductDetailErrorFallback}>
            <ProductDetailPage />
          </ErrorBoundary>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
