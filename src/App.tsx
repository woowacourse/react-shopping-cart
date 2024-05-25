import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MobileLayout from './components/common/MobileLayout/MobileLayout';
import CartOrdersPageContainer from './pages/CartOrders/CartOrdersPageContainer';
import StartPage from './pages/StartPage';
import { ROUTES } from './constants/routes';
import CartOrderFormPageContainer from './pages/CartOrderForm/CartOrderFormPageContainer';
import CartOrderCompletePage from './pages/CartOrderComplete/CartOrderCompletePage';

function App() {
  return (
    <BrowserRouter>
      <MobileLayout>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path={ROUTES.CART_ORDERS} element={<CartOrdersPageContainer />} />
          <Route path={ROUTES.CART_ORDER_FORM} element={<CartOrderFormPageContainer />} />
          <Route path={ROUTES.CART_ORDER_COMPLETE} element={<CartOrderCompletePage />} />
        </Routes>
      </MobileLayout>
    </BrowserRouter>
  );
}

export default App;
