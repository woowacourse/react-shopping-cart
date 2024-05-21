import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';

import CartEmpty from '@components/Cart/CartEmpty';
import CartOrderInfo from '@components/Cart/CartOrderInfo';
import CartProducts from '@components/Cart/CartProducts';
import CartTitle from '@components/Cart/CartTitle';
import OrderConfirmButton from '@components/Cart/OrderConfirmButton';
import { cartItemsState } from '@recoil/cartItems/atoms';

export default function Cart() {
  const cartItems = useRecoilValue(cartItemsState);

  return (
    <>
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
      <OrderConfirmButton />
    </>
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
