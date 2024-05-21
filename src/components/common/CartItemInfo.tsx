import { css } from '@emotion/react';

import CountButtonContainer from '../CartItem/CountButtonContainer';

import { CartItemProps } from '@/types/cartItem';

interface CartItemInfoProps {
  item: CartItemProps;
  type: 'CART' | 'ORDER';
}

const CartItemInfo = ({ item, type }: CartItemInfoProps) => {
  return (
    <div css={cartItemBody}>
      <img css={image} src={item.product.imageUrl} width={112} height={112} />
      <div css={cartItemInfoWrapper}>
        <span>{item.product.name}</span>
        <span css={price}>{item.product.price.toLocaleString('ko-KR')}원</span>
        {type === 'CART' ? <CountButtonContainer item={item} /> : <span>{item.quantity}개</span>}
      </div>
    </div>
  );
};

export default CartItemInfo;

const cartItemBody = css`
  display: flex;
  gap: 20px;
`;

const image = css`
  border-radius: 8px;
`;

const cartItemInfoWrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const price = css`
  font-weight: 700;
  font-size: 24px;
`;
