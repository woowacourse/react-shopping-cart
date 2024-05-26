import { Suspense, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { useRecoilValue } from 'recoil';
import { checkedCartItemIdsState } from '../../recoil/atoms';

import {
  NavigationBar,
  PreviousPageButton,
  FooterButton,
  PageTitle,
  ErrorFallback,
} from '../../components/common';
import * as Styled from './ConfirmOrderPage.style';

import { ENDPOINT } from '../../routes/router.constants';
import { OrderContainer } from '../../components/confirmOrder';
import { submitOrder } from '../../apis';
import { ERROR_MESSAGE } from '../../apis/constants/errorMessage';
import { useFetchError } from '../../hooks';

export default function ConfirmOrderPage() {
  const { throwFetchError, resetFetchError } = useFetchError();
  const checkedCartItemIds = useRecoilValue(checkedCartItemIdsState);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state || !location.state.isFromCartPage) {
      navigate(ENDPOINT.shoppingCart);
    }
  }, [location.state, navigate]);

  const handleClickPreviousPageButton = () => {
    navigate(ENDPOINT.shoppingCart);
  };

  const handleClickPaymentButton = async () => {
    try {
      await submitOrder(checkedCartItemIds);
      resetFetchError();
      navigate(ENDPOINT.confirmPayment, {
        state: {
          isFromOrderPage: true,
        },
      });
    } catch (error) {
      throwFetchError(error, ERROR_MESSAGE.SUBMIT_ORDER_FAILED);
    }
  };

  return (
    <ErrorBoundary FallbackComponent={({ error }) => <ErrorFallback error={error} />}>
      <Suspense>
        <NavigationBar>
          <PreviousPageButton onClick={handleClickPreviousPageButton} />
        </NavigationBar>

        <Styled.OrderContent>
          <PageTitle title="주문 확인" />
          <OrderContainer />
        </Styled.OrderContent>

        <FooterButton type="button" buttonText="결제하기" onClick={handleClickPaymentButton} />
      </Suspense>
    </ErrorBoundary>
  );
}
