import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MobileLayout from './components/common/MobileLayout/MobileLayout';
import CartPageContainer from './pages/CartOrders/CartPageContainer';
import StartPage from './pages/StartPage';
import { ROUTES } from './constants/routes';
import CartOrderFormPageContainer from './pages/CartOrderForm/CartOrderFormPageContainer';

function App() {
  return (
    <BrowserRouter>
      <MobileLayout>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path={ROUTES.CART_ORDERS} element={<CartPageContainer />} />
          <Route path={ROUTES.CART_ORDER_FORM} element={<CartOrderFormPageContainer />} />
        </Routes>
      </MobileLayout>
    </BrowserRouter>
  );
}

export default App;
