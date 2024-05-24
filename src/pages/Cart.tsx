import { Suspense } from 'react';
import Header from '../components/Header/Header';
import styled from 'styled-components';
import ErrorFallback from '../components/ErrorFallback';
import { ErrorBoundary } from 'react-error-boundary';
import CartContent, {
  NoCartItemContainer,
} from '../components/CartContent/CartContent';

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

function Cart() {
  return (
    <CartContainer>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Header headerIconType="home" />

        <Suspense
          fallback={<NoCartItemContainer>Loading...</NoCartItemContainer>}
        >
          <CartContent />
        </Suspense>
      </ErrorBoundary>
    </CartContainer>
  );
}
export default Cart;
