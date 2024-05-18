import { css } from '@emotion/react';
import { ChangeEvent } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { CHECKED, UNCHECKED } from '@assets/images';
import { cartItemsState } from '@recoil/cartItems/atoms';
import { allCheckedState } from '@recoil/cartItems/selectors';

import CartItem from '@components/CartItem';

export default function CartProducts() {
  const cartItems = useRecoilValue(cartItemsState);
  const [allChecked, setAllChecked] = useRecoilState(allCheckedState);

  const onCheckedHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setAllChecked(e.target.checked);
  };

  return (
    <div css={productsContainer}>
      <div css={allCheckedContainer}>
        <input
          id="allChecked"
          type="checkbox"
          checked={allChecked}
          css={screenReaderOnly}
          onChange={onCheckedHandler}
        />
        <label css={label} htmlFor="allChecked">
          <img
            src={allChecked ? CHECKED : UNCHECKED}
            width={24}
            height={24}
            css={checkIcon}
            alt="check icon"
          />
          <span css={labelText}>전체 선택</span>
        </label>
      </div>

      <ul>
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

const checkIcon = css`
  cursor: pointer;
`;

const label = css`
  display: flex;
  align-items: center;
  gap: 8px;

  height: 24px;
`;

const labelText = css`
  font-size: 12px;
  font-weight: 400;
`;

const screenReaderOnly = css`
  position: absolute;
  overflow: hidden;

  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  border: 0;

  clip-path: inset(50%);
  clip: rect(0 0 0 0);
`;
