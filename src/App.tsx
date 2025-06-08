import styled from '@emotion/styled';
import CartItemsProvider from './contexts/CartItems/CartItemsProvider';
import PageProvider from './contexts/Page/PageProvider';
import PageController from './pages/PageController';
import { ErrorToastProvider } from './contexts/ErrorToast/ErrorToastProvider';
import CheckCartIdsProvider from './contexts/CheckedCartIds/CheckedCartIdsProvider';
import { ShippingProvider } from './contexts/Shipping/ShippingProvider';

function App() {
  return (
    <S.layout>
      <ErrorToastProvider>
        <PageProvider>
          <CartItemsProvider>
            <CheckCartIdsProvider>
              <ShippingProvider>
                <PageController />
              </ShippingProvider>
            </CheckCartIdsProvider>
          </CartItemsProvider>
        </PageProvider>
      </ErrorToastProvider>
    </S.layout>
  );
}

const S = {
  layout: styled.div`
    width: 430px;
    height: 100vh;
    margin: 0 auto;
  `,
};

export default App;
