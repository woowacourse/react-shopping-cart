import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ReturnCartButton from '@components/common/Button/ReturnCartButton';
import ErrorComponent from '@components/common/ErrorComponent';
import Header from '@components/common/Header';
import LoadingComponent from '@components/common/LoadingComponent';
import PurchaseConfirmMainSection from '@components/Purchase/PurchaseConfirmMainSection';

export default function PurchaseConfirmPage() {
  return (
    <>
      <Header />
      <ErrorBoundary FallbackComponent={ErrorComponent}>
        <Suspense fallback={<LoadingComponent />}>
          <PurchaseConfirmMainSection />
          <ReturnCartButton />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
