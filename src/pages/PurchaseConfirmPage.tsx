import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import Header from '@components/common/Header';
import LoadingComponent from '@components/common/LoadingComponent';
import ReturnCartButton from '@components/common/ReturnCartButton';

import ErrorComponent from '@components/ErrorComponent';
import PurchaseConfirmMainSection from '@components/PurchaseConfirmMainSection';

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
