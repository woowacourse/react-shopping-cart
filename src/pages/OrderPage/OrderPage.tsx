import { BottomButton, LoadingSpinner } from '@components/common';
import APIErrorBoundary from '@components/common/ErrorBoundary/APIErrorBoundary';
import ErrorFallback from '@components/common/ErrorBoundary/ErrorFallback/ErrorFallback';
import { cartItemsSelector, selectedIdsAtom } from '@recoil/shoppingCart';
import { ROUTE_PATHS } from '@routes/route.constant';
import { lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import * as Styled from './OrderPage.styled';

const ShoppingCartContent = lazy(() => import('@components/shoppingCart/ShoppingCartContent/ShoppingCartContent'));

const OrderPage: React.FC = () => {
  const cartItems = useRecoilValue(cartItemsSelector);
  const selectedIds = useRecoilValue(selectedIdsAtom);

  const isButtonDisabled = cartItems.length === 0 || selectedIds.size === 0;

  const navigate = useNavigate();

  return (
    <>
      <Styled.OrderPageTitle>장바구니</Styled.OrderPageTitle>
      <APIErrorBoundary onReset={() => navigate(-1)} fallback={ErrorFallback}>
        <Suspense fallback={<LoadingSpinner $width="100%" $height="70vh" />}>
          <ShoppingCartContent />
        </Suspense>
      </APIErrorBoundary>
      <BottomButton onClick={() => navigate(ROUTE_PATHS.confirm)} disabled={isButtonDisabled}>
        주문 확인
      </BottomButton>
    </>
  );
};

export default OrderPage;
