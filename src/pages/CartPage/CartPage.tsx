import { Suspense, useEffect } from 'react';
import { useRecoilValueLoadable } from 'recoil';

import CartCheckoutBox from '../../components/cart/CartCheckoutBox/CartCheckoutBox';
import CartList from '../../components/cart/CartList/CartList';
import CartListSkeleton from '../../components/cart/CartList/CartListSkeleton';
import CartListHeader from '../../components/cart/CartListHeader/CartListHeader';
import { CART_LIST_CHECKBOX_KEY } from '../../constants/store';
import { useCheckboxList } from '../../hooks/common/useCheckboxList';
import { cartIdListState } from '../../store/cart';
import * as S from './CartPage.style';

const CartPage = () => {
  const cartIdList = useRecoilValueLoadable(cartIdListState);
  const { setInitialCheckedList } = useCheckboxList(CART_LIST_CHECKBOX_KEY);

  useEffect(() => {
    if (cartIdList.state === 'hasValue') {
      setInitialCheckedList(cartIdList.contents);
    }
  }, [cartIdList.contents, cartIdList.state, setInitialCheckedList]);

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
