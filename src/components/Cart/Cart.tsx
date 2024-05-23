import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';

import Main from '../common/Main';

import CartEmpty from '@components/Cart/CartEmpty';
import CartOrderInfo from '@components/Cart/CartOrderInfo';
import CartProducts from '@components/Cart/CartProducts';
import CartTitle from '@components/Cart/CartTitle';
import OrderConfirmButton from '@components/Cart/OrderConfirmButton';
import { cartItemsState } from '@recoil/cartItems/atoms';

export default function Cart() {
  const cartItems = useRecoilValue(cartItemsState);

  const CartItems = () => (
    <>
      <CartProducts />
      <CartOrderInfo />
    </>
  );

  return (
    <>
      <Main>
        <section css={cartSection}>
          <CartTitle cartItemLength={cartItems.length} />
          {cartItems.length ? <CartItems /> : <CartEmpty />}
        </section>
      </Main>
      <OrderConfirmButton />
    </>
  );
}

const cartSection = css`
  display: flex;
  flex-direction: column;
`;
