import styled from '@emotion/styled';
import router from './router/router';
import { RouterProvider } from 'react-router-dom';
import ToastProvider from './contexts/ToastProvider';
import CartItemsProvider from './contexts/CartItemsProvider';
import CouponProvider from './contexts/CouponProvider';

function App() {
  return (
    <S.Layout>
      <ToastProvider>
        <CartItemsProvider>
          <CouponProvider>
            <RouterProvider router={router} />
          </CouponProvider>
        </CartItemsProvider>
      </ToastProvider>
    </S.Layout>
  );
}

const S = {
  Layout: styled.div`
    position: relative;
    width: 430px;
    height: 100vh;
    margin: 0 auto;
  `,
};

export default App;
