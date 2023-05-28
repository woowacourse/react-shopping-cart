import { Suspense } from 'react';

import CartCheckoutBox from '../../components/cart/CartCheckoutBox/CartCheckoutBox';
import CartList from '../../components/cart/CartList/CartList';
import CartListSkeleton from '../../components/cart/CartList/CartListSkeleton';
import CartListHeader from '../../components/cart/CartListHeader/CartListHeader';
import * as S from './CartPage.style';

const CartPage = () => {
  return (
    <>
      <S.CartPageHeading size="small">장바구니</S.CartPageHeading>
      <S.CartInformationContainer>
        <div>
          <CartListHeader />
          <Suspense fallback={<CartListSkeleton />}>
            <CartList />
          </Suspense>
        </div>
        <CartCheckoutBox />
      </S.CartInformationContainer>
    </>
  );
};

export default CartPage;
