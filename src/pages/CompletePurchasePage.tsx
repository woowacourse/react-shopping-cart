import { Suspense } from 'react';

import { useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import Header from '../components/Header/Header';
import { Button } from '../components/common/Button/Button.style';
import ErrorFallback from '../components/ErrorFallback/ErrorFallback';
import LoadingFallback from '../components/LoadingFallback/LoadingFallback';
import CompletePurchaseSection from '../components/CompletePurchaseSection/CompletePurchaseSection';

const CompletePurchasePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<LoadingFallback />}>
          <CompletePurchaseSection />
        </Suspense>
      </ErrorBoundary>
      <Button
        color="primary"
        width="full"
        radius={0}
        size="l"
        style={{ position: 'fixed', maxWidth: '768px', bottom: '0' }}
        onClick={() => {
          navigate('/');
        }}
      >
        장바구니로 돌아가기
      </Button>
    </>
  );
};
export default CompletePurchasePage;
