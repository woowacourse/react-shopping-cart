import styled from '@emotion/styled';
import CartItemsProvider from './contexts/CartItemsProvider';
import PageProvider from './contexts/PageProvider';
import PageController from './pages/PageController';
import { ErrorToastProvider } from './contexts/ErrorToastProvider';
import CheckCartIdsProvider from './contexts/CheckedCartIdsProvider';

function App() {
  return (
    <S.layout>
      <ErrorToastProvider>
        <PageProvider>
          <CartItemsProvider>
            <CheckCartIdsProvider>
              <PageController />
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
