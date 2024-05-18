import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';

import CartOrderInfo from '@components/Cart/CartOrderInfo';
import CartProducts from '@components/Cart/CartProducts';
import CartTitle from '@components/Cart/CartTitle';
import { cartItemsState } from '@recoil/cartItems/atoms';

export default function CartMain() {
  const cartItems = useRecoilValue(cartItemsState);

  return (
    <main css={main}>
      <section css={cartSection}>
        <CartTitle cartItemLength={cartItems.length} />
        {cartItems.length ? (
          <>
            <CartProducts />
            <CartOrderInfo />
          </>
        ) : (
          <div css={cartEmptyContainer}>
            <span css={cartEmptyText}>장바구니에 담은 상품이 없습니다.</span>
          </div>
        )}
      </section>
    </main>
  );
}

const main = css`
  flex: 1;
  padding: 36px 24px;

  overflow-y: scroll;
`;

const cartSection = css`
  display: flex;
  flex-direction: column;
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
