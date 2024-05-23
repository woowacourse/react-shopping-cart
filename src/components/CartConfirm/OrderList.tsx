import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';

import OrderItem from './OrderItem';

import { checkedItemsSelector } from '@recoil/cartItems/selectors';

export default function OrderList() {
  const orderItems = useRecoilValue(checkedItemsSelector);

  return (
    <ul css={orderItemsContainer}>
      {orderItems.map((orderItem) => (
        <OrderItem orderItem={orderItem} />
      ))}
    </ul>
  );
}

const orderItemsContainer = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
