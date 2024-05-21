import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';

import AllChecked from './AllChecked';
import CartItem from './CartItem';

import { cartItemsState } from '@recoil/cartItems/atoms';

export default function CartProducts() {
  const cartItems = useRecoilValue(cartItemsState);

  return (
    <div css={productsContainer}>
      <AllChecked />
      <ul css={cartItemList}>
        {cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))}
      </ul>
    </div>
  );
}

const productsContainer = css`
  display: flex;
  flex-direction: column;

  padding-bottom: 52px;
`;

const cartItemList = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
