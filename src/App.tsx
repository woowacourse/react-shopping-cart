import styled from '@emotion/styled';
import CartItemsProvider from './contexts/CartItemsProvider';
import PageProvider from './contexts/PageProvider';
import PageController from './pages/PageController';
import CheckedCartItemsProvider from './contexts/CheckedCartItemsProvider';

function App() {
  return (
    <S.layout>
      <PageProvider>
        <CartItemsProvider>
          <CheckedCartItemsProvider>
            <PageController />
          </CheckedCartItemsProvider>
        </CartItemsProvider>
      </PageProvider>
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
