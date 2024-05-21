import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';

import CartHeaderSection from './CartHeaderSection';
import CartFooterSection from '../common/CartFooter';
import CartItem from '../common/CartItem';

import RandomAddButton from '@/components/common/RandomAddButton';
import AllCheckBox from '@components/common/AllCheckBox';
import { cartItemsState } from '@recoil/cartItems/atoms';

export default function CartMainSection() {
  const cartItems = useRecoilValue(cartItemsState);

  if (cartItems.length === 0) {
    return (
      <div css={cartEmptyContainer}>
        <span css={cartEmptyText}>장바구니에 담은 상품이 없습니다.</span>
      </div>
    );
  }

  return (
    <main css={main}>
      <CartHeaderSection cartItemLength={cartItems.length} />
      <section css={cartMainSection}>
        <AllCheckBox />
        <ul>
          {cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} type="CART" />
          ))}
        </ul>
      </section>
      <CartFooterSection type="CART" />
      <RandomAddButton />
    </main>
  );
}

const main = css`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 10px;

  padding: 0 24px;

  overflow-y: scroll;
`;

const cartMainSection = css`
  padding-bottom: 42px;
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
