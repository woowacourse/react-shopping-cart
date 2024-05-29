import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorComponent from '@/components/common/ErrorFallback/ErrorFallback';
import Header from '@/components/common/Header/Header';
import LoadingComponent from '@/components/common/LoadingFallback/LoadingFallback';
import ReturnCartButton from '@components/common/Button/ReturnCartButton';
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
