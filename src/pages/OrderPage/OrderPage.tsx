import { BottomButton, LoadingSpinner } from '@components/common';
import { cartItemsSelector, selectedIdsAtom } from '@recoil/shoppingCart';
import { ROUTE_PATHS } from '@routes/route.constant';
import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import * as Styled from './OrderPage.styled';
import OrderPageErrorFallback from './OrderPageErrorFallback';

const OrderPageContents = lazy(() => import('@components/shoppingCart/ShoppingCartContent/ShoppingCartContent'));

const OrderPage: React.FC = () => {
  const cartItems = useRecoilValue(cartItemsSelector);
  const selectedIds = useRecoilValue(selectedIdsAtom);

  const isButtonDisabled = cartItems.length === 0 || selectedIds.length === 0;

  const navigate = useNavigate();

  return (
    <Styled.OrderPageContainer>
      <h1 className="cart-item-count">장바구니</h1>
      <ErrorBoundary FallbackComponent={OrderPageErrorFallback}>
        <Suspense fallback={<LoadingSpinner $width="100%" $height="70vh" />}>
          <OrderPageContents />
        </Suspense>
      </ErrorBoundary>
      <BottomButton onClick={() => navigate(ROUTE_PATHS.confirm)} disabled={isButtonDisabled}>
        주문 확인
      </BottomButton>
    </Styled.OrderPageContainer>
  );
};

export default OrderPage;
