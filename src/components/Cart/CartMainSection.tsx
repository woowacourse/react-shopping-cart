import { css } from '@emotion/react';
import { useRecoilState, useRecoilValue } from 'recoil';

import CartFooterSection from './CartFooterSection';
import CartHeaderSection from './CartHeaderSection';

import { CHECKED, UNCHECKED } from '@/assets/images';
import { cartItemsState } from '@recoil/cartItems/atoms';
import { allCheckedState } from '@recoil/cartItems/selectors';

import CartItem from '@components/CartItem';

export default function CartMainSection() {
  const cartItems = useRecoilValue(cartItemsState);
  const [allChecked, setAllChecked] = useRecoilState(allCheckedState);

  return (
    <main css={main}>
      {cartItems.length ? (
        <>
          <CartHeaderSection cartItemLength={cartItems.length} />
          <section css={cartMainSection}>
            <input
              id="allChecked"
              type="checkbox"
              checked={allChecked}
              css={srOnly}
              onChange={(e) => setAllChecked(e.target.checked)}
            />
            <label css={label} htmlFor="allChecked">
              <img src={allChecked ? CHECKED : UNCHECKED} css={checkIcon} />
              <span css={labelText}>전체 선택</span>
            </label>
            <ul>
              {cartItems.map((cartItem) => (
                <CartItem key={cartItem.id} item={cartItem} />
              ))}
            </ul>
          </section>
          <CartFooterSection />
        </>
      ) : (
        <div css={cartEmptyContainer}>
          <span css={cartEmptyText}>장바구니에 담은 상품이 없습니다.</span>
        </div>
      )}
    </main>
  );
}

const cartMainSection = css`
  padding-bottom: 52px;
`;

const checkIcon = css`
  width: 24px;
  height: 24px;

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
  border: 0;

  overflow: hidden;
  clip-path: inset(50%);
  clip: rect(0 0 0 0);
`;

const main = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 24px;

  overflow-y: scroll;
`;

const cartEmptyContainer = css`
  display: flex;
  justify-content: center;
  flex: 1;
  align-items: center;

  width: 100%;
  height: 100%;
`;

const cartEmptyText = css`
  font-size: 16px;
  font-weight: 400;
`;
