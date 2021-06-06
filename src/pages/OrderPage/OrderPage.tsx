import React, { ReactElement } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import Styled from './OrderPage.styles';
import PageHeader from '../../components/shared/PageHeader/PageHeader';
import PriceOverview from '../../components/units/PriceOverview/PriceOverview';
import HighlightText from '../../components/shared/HighlightText/HighlightText';
import Button from '../../components/shared/Button/Button';
import OrderItem from '../../components/units/OrderItem/OrderItem';
import * as T from '../../types';
import { toPriceFormat } from '../../utils';
import ROUTES from '../../constants/routes';
import useOrder from '../../hooks/useOrder';

type LocationState = {
  checkedItems: T.CartItem[];
};

const OrderPage = (): ReactElement => {
  const location = useLocation<LocationState>();

  const { status, onAdd } = useOrder();
  // const [{ status, error }, fetchOrder] = useAxios(API.ORDERS, { method: T.ApiMethod.POST });

  const checkedItems = location?.state?.checkedItems;

  // useEffect(() => {
  //   if (error) {
  //     enqueueSnackbar(MESSAGE.PURCHASE_CART_ITEMS_FAILURE);
  //   }
  // }, [enqueueSnackbar, error]);

  // useEffect(() => {
  //   if (status === T.AsyncStatus.SUCCESS) {
  //     history.replace(ROUTES.ORDER_COMPLETE);
  //   }
  // }, [checkedItems, dispatch, enqueueSnackbar, error, history, status]);

  if (!location.state) return <Redirect to={ROUTES.ROOT} />;

  const handlePurchaseCartItems = async () => {
    if (status === T.AsyncStatus.PENDING) return;

    await onAdd(checkedItems);
  };

  const checkedItemsTotalPrice = checkedItems?.reduce?.((acc: number, curr: T.CartItem) => {
    return acc + curr.price * curr.quantity;
  }, 0);

  return (
    <Styled.Root>
      <PageHeader title="주문/결제" />
      <Styled.Order>
        <Styled.OrderListContainer>
          <Styled.OrderListHeader>주문 상품({checkedItems.length}건)</Styled.OrderListHeader>
          <Styled.OrderItemList>
            {checkedItems?.map?.((item) => (
              <OrderItem key={item.cartId} title={item.name} imageUrl={item.imageUrl} quantity={item.quantity} />
            ))}
          </Styled.OrderItemList>
        </Styled.OrderListContainer>

        <Styled.PriceOverviewWrapper>
          <PriceOverview headerText="결제금액">
            <Styled.HighlightTextWrapper>
              <HighlightText text="총 결제금액" />
              <HighlightText text={`${toPriceFormat(checkedItemsTotalPrice)}원`} />
            </Styled.HighlightTextWrapper>
            <Button
              fullWidth
              text={`${toPriceFormat(checkedItemsTotalPrice)}원 결제하기`}
              size={T.ButtonSize.REGULAR}
              onClick={handlePurchaseCartItems}
            />
          </PriceOverview>
        </Styled.PriceOverviewWrapper>
      </Styled.Order>
    </Styled.Root>
  );
};

export default OrderPage;
