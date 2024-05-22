import * as S from './style';

import CartItemContainer from '../CartItemContainer/CartItemContainer';
import OrderAmount from '../CartAmount/CartAmount';
import { cartItemsState } from '../../../recoil/atoms';
import { useRecoilValue } from 'recoil';

export default function CartContainer() {
  const items = useRecoilValue(cartItemsState);

  if (items.length === 0) {
    return <S.EmptyCartContainer>장바구니에 담은 상품이 없습니다.</S.EmptyCartContainer>;
  }

  return (
    <>
      <CartItemContainer />
      <OrderAmount />
    </>
  );
}
