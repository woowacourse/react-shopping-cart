import { Suspense } from 'react';

import { useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import useOrder from '../hooks/order/useOrders';
import Header from '../components/Header/Header';
import { Button } from '../components/common/Button/Button.style';
import ErrorFallback from '../components/ErrorFallback/ErrorFallback';
import LoadingFallback from '../components/LoadingFallback/LoadingFallback';
import ConfirmPurchaseSection from '../components/ConfirmPurchaseSection/ConfirmPurchaseSection';

const ConfirmPurchasePage = () => {
  const navigate = useNavigate();
  const { orderSelectedCartItems } = useOrder();
  return (
    <>
      <Header type="back" />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<LoadingFallback />}>
          <ConfirmPurchaseSection />
        </Suspense>
      </ErrorBoundary>
      <Button
        color="primary"
        width="full"
        radius={0}
        size="l"
        style={{ position: 'fixed', maxWidth: '768px', bottom: '0' }}
        onClick={() => {
          orderSelectedCartItems();
          navigate('/complete-purchase');
        }}
      >
        결제하기
      </Button>
    </>
  );
};
export default ConfirmPurchasePage;
