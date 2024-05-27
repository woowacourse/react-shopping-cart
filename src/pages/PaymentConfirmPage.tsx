import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import Error from '@components/common/Error';
import Header from '@components/common/Header';
import Loading from '@components/common/Loading';

import PaymentConfirm from '@components/PaymentConfirm';

export default function PaymentConfirmPage() {
  return (
    <>
      <Header></Header>
      <ErrorBoundary fallbackRender={({ error }) => <Error errorMessage={error.message} />}>
        <Suspense fallback={<Loading />}>
          <PaymentConfirm />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
