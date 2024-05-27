import { Suspense, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { useRecoilValue } from 'recoil';
import { checkedCartItemIdsState } from '../../recoil/atoms';
import {
  checkedCartItemsState,
  totalAmountState,
  totalCheckedQuantityState,
} from '../../recoil/selectors';

import {
  NavigationBar,
  PreviousPageButton,
  FooterButton,
  PageTitle,
  ErrorFallback,
} from '../../components/common';
import * as Styled from './ConfirmOrderPage.style';

import { submitOrder } from '../../apis';
import { ERROR_MESSAGE } from '../../apis/constants/errorMessage';
import { useClearOrderedItems, useFetchError } from '../../hooks';
import { ENDPOINT } from '../../routes/router.constants';
import { OrderContainer } from '../../components/confirmOrder';

export default function ConfirmOrderPage() {
  const { throwFetchError, resetFetchError } = useFetchError();
  const clearOrderedItems = useClearOrderedItems();

  const checkedCartItemIds = useRecoilValue(checkedCartItemIdsState);
  const totalCheckedCartItems = useRecoilValue(checkedCartItemsState);
  const totalProductsCount = useRecoilValue(totalCheckedQuantityState);
  const totalAmount = useRecoilValue(totalAmountState);

  const orderedItemsInfo = {
    orderedCartItemsCount: totalCheckedCartItems.length,
    totalProductsCount: totalProductsCount,
    totalAmount: totalAmount,
  } as const;

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state?.isFromCartPage) {
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
      clearOrderedItems(checkedCartItemIds);
      navigate(ENDPOINT.confirmPayment, {
        state: {
          isFromOrderPage: true,
          ...orderedItemsInfo,
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
