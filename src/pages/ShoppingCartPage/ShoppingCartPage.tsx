import { BottomButton, LoadingSpinner } from '@components/common';
import APIErrorBoundary from '@components/common/ErrorBoundary/APIErrorBoundary';
import ErrorFallback from '@components/common/ErrorBoundary/ErrorFallback/ErrorFallback';
import { isInaccessibleAreaAtom } from '@recoil/orderConfirm';
import { cartItemsAtom, selectedIdsAtom } from '@recoil/shoppingCart';
import { ROUTE_PATHS } from '@routes/route.constant';
import { lazy, Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import * as Styled from './ShoppingCartPage.styled';

const ShoppingCartContent = lazy(() => import('@components/shoppingCart/ShoppingCartContent/ShoppingCartContent'));

const OrderPage: React.FC = () => {
  const cartItems = useRecoilValue(cartItemsAtom);
  const selectedIds = useRecoilValue(selectedIdsAtom);

  const isButtonDisabled = cartItems.length === 0 || selectedIds.size === 0;

  const resetIsInaccessibleArea = useResetRecoilState(isInaccessibleAreaAtom);

  useEffect(() => {
    resetIsInaccessibleArea();
  }, [resetIsInaccessibleArea]);

  const navigate = useNavigate();

  return (
    <>
      <Styled.OrderPageTitle>장바구니</Styled.OrderPageTitle>
      <APIErrorBoundary onReset={() => navigate(ROUTE_PATHS.root)} fallback={ErrorFallback}>
        <Suspense fallback={<LoadingSpinner $width="100%" $height="70vh" />}>
          <ShoppingCartContent />
        </Suspense>
      </APIErrorBoundary>
      <BottomButton onClick={() => navigate(ROUTE_PATHS.orderConfirm)} disabled={isButtonDisabled}>
        주문 확인
      </BottomButton>
    </>
  );
};

export default OrderPage;
