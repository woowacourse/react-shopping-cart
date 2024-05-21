import React, { Suspense } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ErrorFallback from '../../components/ErrorFallback/ErrorFallback';
import { ErrorBoundary } from 'react-error-boundary';
import CartContent from '../../components/CartContent/CartContent';
import { URL_PATH } from '../../constants/UrlPath';
import * as S from './Cart.styled';

function Cart() {
  return (
    <S.CartContainer>
      <Header headerIconType="home" />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <S.ContentWrapper>
          <Suspense
            fallback={<S.SuspenseFallBack>Loading...</S.SuspenseFallBack>}
          >
            <CartContent />
          </Suspense>
        </S.ContentWrapper>
        <Footer isDisabled={false} url={URL_PATH.order} />
      </ErrorBoundary>
    </S.CartContainer>
  );
}

export default Cart;
