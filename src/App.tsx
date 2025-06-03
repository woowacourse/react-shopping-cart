import { BrowserRouter as Router, Route, Routes } from 'react-router';
import CartPage from './page/CartPage';
import { css } from '@emotion/react';
import OrderPage from './page/OrderPage';
import { ApiProvider } from './contexts/ApiContext';
import { ToastProvider } from './contexts/ToastContext';

const isTest = import.meta.env.MODE === 'test';
const basename = isTest ? '' : '/react-shopping-cart';

function App() {
  return (
    <ApiProvider>
      <ToastProvider>
        <div css={RoutesStyle}>
          <Router basename={basename}>
            <Routes>
              <Route path="/" element={<CartPage />} />
              <Route path="/order" element={<OrderPage />} />
            </Routes>
          </Router>
        </div>
      </ToastProvider>
    </ApiProvider>
  );
}

export default App;

const RoutesStyle = css({
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  height: '100dvh',
  width: '430px',
  margin: '0 auto'
});
