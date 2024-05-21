import React, { Suspense } from 'react';
import Header from '../../components/Header/Header';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../../components/ErrorFallback/ErrorFallback';
import OrderContent from '../../components/OrderContent/OrderContent';
import Footer from '../../components/Footer/Footer';
import { URL_PATH } from '../../constants/UrlPath';

// TODO: 스타일 지정하기
function Order() {
  return (
    <div>
      <Header headerIconType="back" />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<div>Loading...</div>}>
          <OrderContent />
        </Suspense>
        <Footer isDisabled={false} url={URL_PATH.completed} />
      </ErrorBoundary>
    </div>
  );
}

export default Order;
