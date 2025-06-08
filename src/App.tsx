import { BrowserRouter, Route, Routes } from 'react-router';
import { Global } from '@emotion/react';
import Layout from './components/Layout/Layout';
import CartPage from './pages/CartPage';
import GlobalStyle from './styles/globalStyle';
import OrderConfirmPage from './pages/OrderConfirmPage';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <>
      <Global styles={GlobalStyle} />
      <Layout>
        <DataProvider>
          <BrowserRouter basename="/react-shopping-cart">
            <Routes>
              <Route path="/" element={<CartPage />} />
              <Route path="/orderConfirm" element={<OrderConfirmPage />} />
            </Routes>
          </BrowserRouter>
        </DataProvider>
      </Layout>
    </>
  );
}

export default App;
