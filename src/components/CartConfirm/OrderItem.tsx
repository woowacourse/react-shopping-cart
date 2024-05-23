import { css } from '@emotion/react';

import CartItemImage from '../common/CartItemImage';

import { CartItemProps } from '@/types/cartItem';

interface OrderItemProps {
  orderItem: CartItemProps;
}

export default function OrderItem({ orderItem }: OrderItemProps) {
  return (
    <li css={orderItemContainer}>
      <CartItemImage
        imageUrl={orderItem.product.imageUrl}
        alt={orderItem.product.name + '상품 이미지'}
      />
      <div css={orderItemInfoContainer}>
        <span css={orderItemName}>{orderItem.product.name}</span>
        <span css={orderItemPrice}>{orderItem.product.price.toLocaleString('ko-KR')}원</span>
        <span css={orderItemQuantity}>{orderItem.quantity}개</span>
      </div>
    </li>
  );
}

const orderItemContainer = css`
  display: flex;

  padding-top: 12px;

  border-top: 1px solid #0000001a;
`;

const orderItemInfoContainer = css`
  display: flex;
  flex-direction: column;
  gap: 4px;

  padding: 9.5px 24px;
`;

const orderItemName = css`
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
`;

const orderItemPrice = css`
  font-size: 24px;
  font-weight: 700;
`;

const orderItemQuantity = css`
  flex: 1;
  display: flex;
  align-items: flex-end;

  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
`;
