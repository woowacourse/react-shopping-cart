import React, { Suspense } from 'react';
import Header from '../../components/Header/Header';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../../components/ErrorFallback/ErrorFallback';
import OrderContent from '../../components/OrderContent/OrderContent';
import Footer from '../../components/Footer/Footer';
import { URL_PATH } from '../../constants/UrlPath';
import * as S from './Order.style';
import { useRecoilValue } from 'recoil';
import { orderItemsSelector } from '../../recoil/selectors';
import { fetchOrder } from '../../api';

function Order() {
  const orderItems = useRecoilValue(orderItemsSelector);

  const handleSubmitButton = () => {
    fetchOrder(orderItems);
  };

  return (
    <div>
      <Header headerIconType="back" />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <S.ContentWrapper>
          <Suspense fallback={<div>Loading...</div>}>
            <OrderContent />
          </Suspense>
        </S.ContentWrapper>
        <Footer
          isDisabled={false}
          url={URL_PATH.completed}
          onFetchEvent={handleSubmitButton}
        />
      </ErrorBoundary>
    </div>
  );
}

export default Order;
