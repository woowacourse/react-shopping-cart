import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';

import CartFooterSection from './CartFooterSection';
import CartHeaderSection from './CartHeaderSection';

import AllCheckBox from '@/components/AllCheckBox';
import { cartItemsState } from '@recoil/cartItems/atoms';

import CartItem from '@components/CartItem';

export default function CartMainSection() {
  const cartItems = useRecoilValue(cartItemsState);

  return (
    <main css={main}>
      {cartItems.length ? (
        <>
          <CartHeaderSection cartItemLength={cartItems.length} />
          <section css={cartMainSection}>
            <AllCheckBox />
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
