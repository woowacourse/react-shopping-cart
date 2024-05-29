import { css } from '@emotion/react';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

import CartMainSection from '@/components/Cart/CartMainSection/CartMainSection';
import OrderConfirmButton from '@/components/Cart/OrderConfirmButton/OrderConfirmButton';
import RandomAddButton from '@/components/common/Button/RandomAddButton';
import ErrorComponent from '@/components/common/ErrorFallback/ErrorFallback';
import Header from '@/components/common/Header/Header';
import LoadingComponent from '@/components/common/LoadingFallback/LoadingFallback';
import { THEME } from '@/constants/theme';

function CartPage() {
  const navigate = useNavigate();

  const handleClickLogo = () => {
    navigate('/');
  };

  return (
    <>
      <Header buttonStyle={homeButton} onClick={handleClickLogo}>
        SHOP
      </Header>
      <ErrorBoundary FallbackComponent={ErrorComponent}>
        <Suspense fallback={<LoadingComponent />}>
          <CartMainSection />
          <OrderConfirmButton />
          <RandomAddButton />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default CartPage;

const homeButton = css`
  height: 100%;

  padding-left: 24px;

  background-color: inherit;

  font-size: 20px;
  font-weight: 800;
  color: ${THEME.WHITE};
`;
