import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorComponent from '@/components/common/ErrorComponent';
import PurchaseConfirmMainSection from '@/components/Purchase/PurchaseConfirmMainSection';
import Header from '@components/common/Header';
import LoadingComponent from '@components/common/LoadingComponent';
import ReturnCartButton from '@components/common/ReturnCartButton';

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
