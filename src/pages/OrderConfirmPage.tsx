import { css } from '@emotion/react';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

import PurchaseButton from '@/components/common/Button/PurchaseButton';
import ErrorComponent from '@/components/common/ErrorComponent';
import CartConfirmMainSection from '@/components/Order/OrderConfirmMainSection';
import { BACK_ARROW } from '@assets/images';
import Header from '@components/common/Header';
import LoadingComponent from '@components/common/LoadingComponent';

export default function OrderConfirmPage() {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Header buttonStyle={button} onClick={handleClickBack}>
        <img src={BACK_ARROW} />
      </Header>
      <ErrorBoundary FallbackComponent={ErrorComponent}>
        <Suspense fallback={<LoadingComponent />}>
          <CartConfirmMainSection />
          <PurchaseButton />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

const button = css`
  padding-left: 24px;

  background-color: inherit;
`;
