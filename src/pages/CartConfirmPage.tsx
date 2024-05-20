import { css } from '@emotion/react';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

import CartConfirmMainSection from '../components/CartConfirmMainSection';

import Header from '@/components/common/Header';
import LoadingComponent from '@/components/common/LoadingComponent';
import ErrorComponent from '@/components/ErrorComponent';
import { BACK_ARROW } from '@assets/images';

export default function CartConfirmPage() {
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
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

const button = css`
  padding-left: 24px;

  background-color: inherit;
`;
