import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';

import CartEmpty from './CartEmpty';

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
          <CartEmpty />
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

  width: 100%;
  height: 100%;
`;
