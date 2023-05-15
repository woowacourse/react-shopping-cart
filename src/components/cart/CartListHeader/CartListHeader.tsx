import { useRecoilValueLoadable } from 'recoil';

import { cartListItemCountState } from '../../../store/cart';
import * as S from './CartListHeader.styles';

const CartListHeader = () => {
  const cartListItemCount = useRecoilValueLoadable(cartListItemCountState);

  return (
    <S.CartListHeaderWrapper>
      <S.CartListHeaderText>
        든든배송 상품 ({(cartListItemCount.state === 'hasValue' && cartListItemCount.contents) || 0}
        개)
      </S.CartListHeaderText>
    </S.CartListHeaderWrapper>
  );
};

export default CartListHeader;
