import { css } from '@emotion/react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { CHECKED, UNCHECKED } from '@/assets/images';
import { cartItemsState } from '@recoil/cartItems/atoms';
import { allCheckedState } from '@recoil/cartItems/selectors';

import CartItem from '@components/CartItem';

export default function CartMainSection() {
  const cartItems = useRecoilValue(cartItemsState);
  const [allChecked, setAllChecked] = useRecoilState(allCheckedState);

  return (
    <section css={cartMainSection}>
      <input
        id="allChecked"
        type="checkbox"
        checked={allChecked}
        css={srOnly}
        onChange={(e) => setAllChecked(e.target.checked)}
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

      <ul>
        {cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))}
      </ul>
    </section>
  );
}

const cartMainSection = css`
  padding-bottom: 52px;
`;

const checkIcon = css`
  cursor: pointer;
`;

const label = css`
  display: flex;
  align-items: center;
  gap: 8px;

  height: 24px;

  padding-bottom: 20px;
`;

const labelText = css`
  font-size: 12px;
  font-weight: 400;
`;

const srOnly = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  border: 0;
  clip: rect(0 0 0 0);
`;
