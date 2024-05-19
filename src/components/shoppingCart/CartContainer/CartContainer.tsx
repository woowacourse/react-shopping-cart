import { useRecoilValue } from 'recoil';
import { currentCartItemsState } from '../../../recoil/atoms';

import { CartItemContainer, OrderAmount } from '../';
import * as Styled from './CartContainer.style';

export default function CartContainer() {
  const items = useRecoilValue(currentCartItemsState);

  if (items.length === 0) {
    return <Styled.EmptyCartContainer>장바구니에 담은 상품이 없습니다.</Styled.EmptyCartContainer>;
  }

  return (
    <>
      <CartItemContainer />
      <OrderAmount />
    </>
  );
}
