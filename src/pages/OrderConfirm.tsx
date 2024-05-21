import { Suspense } from 'react';
import Header from '../components/Header/Header';
import styled from 'styled-components';
import Footer from '../components/Footer/Footer';
import ErrorFallback from '../components/ErrorFallback';
import { ErrorBoundary } from 'react-error-boundary';
import { URL_PATH } from '../constants/UrlPath';
import OrderConfirmContent from '../components/OrderConfirmContent/OrderConfirmContent';
import { NoCartItemContainer } from '../components/CartContent/CartContent';

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ContentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 3.6rem 2.4rem 10.4rem 2.4rem;
  box-sizing: border-box;
  height: 100%;
`;

function OrderConfirm() {
  return (
    <CartContainer>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Header headerIconType="home" />
        <ContentWrapper>
          <Suspense
            fallback={<NoCartItemContainer>Loading...</NoCartItemContainer>}
          >
            <OrderConfirmContent />
          </Suspense>
        </ContentWrapper>
        <Footer isDisabled={false} url={URL_PATH.completed} />
      </ErrorBoundary>
    </CartContainer>
  );
}
export default OrderConfirm;
