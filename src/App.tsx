import { BrowserRouter as Router, Route, Routes } from 'react-router';
import CartPage from './page/CartPage';
import { css } from '@emotion/react';
import OrderPage from './page/OrderPage';

function App() {
  return (
    <div css={RoutesStyle}>
      <Router>
        <Routes>
          <Route path="/" element={<CartPage />} />
          <Route path="/order" element={<OrderPage />} />
        </Routes>
      </Router>
    </div>
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
