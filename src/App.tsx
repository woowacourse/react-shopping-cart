import { useEffect, VFC } from 'react';
import { Route, Switch } from 'react-router';
import NavigationBar from './components/NavigationBar';
import useCart from './service/hooks/useCart';
import OrderConfirmPage from './pages/OrderConfirmPage';
import OrderListPage from './pages/OrderListPage';
import ProductListPage from './pages/ProductListPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import ProductDetailPage from './pages/ProductDetailPage';
import { ErrorBoundary } from 'react-error-boundary';

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
          <ErrorBoundary
            fallbackRender={({ resetErrorBoundary }) => (
              <div>
                상품목록 조회에 실패했습니다 ㅎㅎ;<button onClick={resetErrorBoundary}>gg;</button>
              </div>
            )}
          >
            <ProductListPage />
          </ErrorBoundary>
        </Route>
        <Route path="/shoppingCart" component={ShoppingCartPage} />
        <Route path="/orderList" component={OrderListPage} />
        <Route path="/orderConfirm" component={OrderConfirmPage} />
        <Route path="/product/:productId" component={ProductDetailPage} />
      </Switch>
    </div>
  );
};

export default App;
