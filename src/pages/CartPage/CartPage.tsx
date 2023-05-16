import { Suspense } from 'react';

import CartCheckoutBox from '../../components/cart/CartCheckoutBox/CartCheckoutBox';
import { CartList } from '../../components/cart/CartList/CartList';
import CartListHeader from '../../components/cart/CartListHeader/CartListHeader';
import Header from '../../components/common/Header/Header';
import * as S from './CartPage.style';

const CartPage = () => {
  return (
    <>
      <Header />
      <main>
        <S.CartPageHeading size="small">장바구니</S.CartPageHeading>
        <S.CartInformationContainer>
          <div>
            <CartListHeader />
            <Suspense fallback={<CartList.Skeleton />}>
              <CartList />
            </Suspense>
          </div>
          <CartCheckoutBox />
        </S.CartInformationContainer>
      </main>
    </>
  );
};

export default CartPage;
