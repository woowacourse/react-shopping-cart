import { Suspense } from 'react';
import Header from '../components/Header/Header';
import styled from 'styled-components';
import ErrorFallback from '../components/ErrorFallback';
import { ErrorBoundary } from 'react-error-boundary';
import OrderConfirmContent from '../components/OrderConfirmContent/OrderConfirmContent';
import { NoCartItemContainer } from '../components/CartContent/CartContent';

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

function OrderConfirm() {
  return (
    <CartContainer>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Header headerIconType="back" />
        <Suspense
          fallback={<NoCartItemContainer>Loading...</NoCartItemContainer>}
        >
          <OrderConfirmContent />
        </Suspense>
      </ErrorBoundary>
    </CartContainer>
  );
}
export default OrderConfirm;
