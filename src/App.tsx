import styled from '@emotion/styled';
import CartItemsProvider from './contexts/CartItemsProvider';
import PageProvider from './contexts/PageProvider';
import PageController from './pages/PageController';
import CheckedCartItemsProvider from './contexts/CheckedCartItemsProvider';
import { ErrorToastProvider } from './contexts/ErrorToastProvider';

function App() {
  return (
    <S.layout>
      <ErrorToastProvider>
        <PageProvider>
          <CartItemsProvider>
            <CheckedCartItemsProvider>
              <PageController />
            </CheckedCartItemsProvider>
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
