import { css } from '@emotion/react';
import { ChangeEvent } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import Checkbox from '@components/common/Checkbox';
import { cartItemsState } from '@recoil/cartItems/atoms';
import { allCheckedState } from '@recoil/cartItems/selectors';

import CartItem from '@components/CartItem';

export default function CartProducts() {
  const cartItems = useRecoilValue(cartItemsState);
  const [allChecked, setAllChecked] = useRecoilState(allCheckedState);

  const handleClickCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setAllChecked(e.target.checked);
  };

  return (
    <div css={productsContainer}>
      <div css={allCheckedContainer}>
        <Checkbox
          checked={allChecked}
          onChange={handleClickCheck}
          id="전체 선택"
          description="전체 선택"
        />
      </div>

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

const allCheckedContainer = css`
  padding-bottom: 20px;
`;

const cartItemList = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
