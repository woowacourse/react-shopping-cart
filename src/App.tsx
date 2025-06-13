import { BrowserRouter, Route, Routes } from 'react-router';
import { Global } from '@emotion/react';
import Layout from './components/Layout/Layout';
import CartPage from './pages/CartPage';
import GlobalStyle from './styles/globalStyle';
import PaymentConfirmPage from './pages/PaymentConfirmPage';
import OrderConfirmPage from './pages/OrderConfirmPage';
import { DataProvider } from './context/DataContext';
import { CartSelectionProvider } from './context/CartSelectContext';

function App() {
  return (
    <DataProvider>
      <CartSelectionProvider>
        <Global styles={GlobalStyle} />
        <Layout>
          <BrowserRouter basename="/react-shopping-cart/">
            <Routes>
              <Route path="/" element={<CartPage />} />
              <Route path="/orderConfirm" element={<OrderConfirmPage />} />
              <Route path="/paymentConfirm" element={<PaymentConfirmPage />} />
            </Routes>
          </BrowserRouter>
        </Layout>
      </CartSelectionProvider>
    </DataProvider>
  );
}

export default App;
