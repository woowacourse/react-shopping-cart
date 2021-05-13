import React, { useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Styled from './OrderPage.styles';
import PageHeader from '../../components/shared/PageHeader/PageHeader';
import PriceOverview from '../../components/units/PriceOverview/PriceOverview';
import HighlightText from '../../components/shared/HighlightText/HighlightText';
import Button from '../../components/shared/Button/Button';
import OrderItem from '../../components/units/OrderItem/OrderItem';
import * as T from '../../types';
import api from '../../api';
import { deleteCheckedItemsActionRequest } from '../../modules/cartItems/actions';

type LocationState = {
  checkedItems: T.CartItem[];
};

const OrderPage = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState<boolean>(false);

  if (!location.state) return <Redirect to="/" />;

  const { checkedItems } = location.state;

  const checkedItemsTotalPrice = checkedItems.reduce((acc: number, curr: T.CartItem) => {
    return acc + curr.product.price * curr.quantity;
  }, 0);

  const handlePurchaseCartItems = async () => {
    if (isLoading) return;

    setLoading(true);

    try {
      await api.post('/orders', { checkedItems });

      const ids = checkedItems.map((cartItem) => cartItem.id);
      dispatch(deleteCheckedItemsActionRequest(ids));

      history.replace('/order/complete');
      return;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error.message);
    }

    setLoading(false);
  };

  return (
    <Styled.Root>
      <PageHeader title="주문/결제" />
      <Styled.Order>
        <Styled.OrderListContainer>
          <Styled.OrderListHeader>주문 상품({checkedItems.length}건)</Styled.OrderListHeader>
          <Styled.OrderItemList>
            {checkedItems?.map((item) => (
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
              <HighlightText text={`${checkedItemsTotalPrice.toLocaleString('ko-KR')}원`} />
            </Styled.HighlightTextWrapper>
            <Button
              text={`${checkedItemsTotalPrice.toLocaleString('ko-KR')}원 결제하기`}
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
