import React, { ReactElement, useEffect } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import Styled from './OrderPage.styles';
import PageHeader from '../../components/shared/PageHeader/PageHeader';
import PriceOverview from '../../components/units/PriceOverview/PriceOverview';
import HighlightText from '../../components/shared/HighlightText/HighlightText';
import Button from '../../components/shared/Button/Button';
import OrderItem from '../../components/units/OrderItem/OrderItem';
import * as T from '../../types';
import { deleteCheckedItemsActionRequest } from '../../modules/cartItems/actions';
import MESSAGE from '../../constants/messages';
import { RootState } from '../../modules';
import { toPriceFormat } from '../../utils';
import useAxios from '../../hooks/useAxios';

type LocationState = {
  checkedItems: T.CartItem[];
};

const OrderPage = (): ReactElement => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const dispatch = useDispatch<ThunkDispatch<RootState, null, Action>>();
  const { enqueueSnackbar } = useSnackbar();
  const [{ status, error }, fetchOrder] = useAxios('/orders', { method: T.ApiMethod.POST });

  const checkedItems = location?.state?.checkedItems;

  useEffect(() => {
    if (error) {
      enqueueSnackbar(MESSAGE.PURCHASE_CART_ITEMS_FAILURE);
    }
  }, [enqueueSnackbar, error]);

  useEffect(() => {
    if (status === T.AsyncStatus.SUCCESS) {
      const ids = checkedItems?.map?.((cartItem) => cartItem.id);
      dispatch(deleteCheckedItemsActionRequest(ids));

      history.replace('/order/complete');
    }
  }, [checkedItems, dispatch, enqueueSnackbar, error, history, status]);

  if (!location.state) return <Redirect to="/" />;

  const handlePurchaseCartItems = async () => {
    if (status === T.AsyncStatus.PENDING) return;

    await fetchOrder({ items: checkedItems });
  };

  const checkedItemsTotalPrice = checkedItems?.reduce?.((acc: number, curr: T.CartItem) => {
    return acc + curr.product.price * curr.quantity;
  }, 0);

  return (
    <Styled.Root>
      <PageHeader title="주문/결제" />
      <Styled.Order>
        <Styled.OrderListContainer>
          <Styled.OrderListHeader>주문 상품({checkedItems.length}건)</Styled.OrderListHeader>
          <Styled.OrderItemList>
            {checkedItems?.map?.((item) => (
              <OrderItem
                key={item.id}
                title={item.product.name}
                imageUrl={item.product.image}
                quantity={item.quantity}
              />
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
              size={T.ButtonSize.LARGE}
              onClick={handlePurchaseCartItems}
            />
          </PriceOverview>
        </Styled.PriceOverviewWrapper>
      </Styled.Order>
    </Styled.Root>
  );
};

export default OrderPage;
