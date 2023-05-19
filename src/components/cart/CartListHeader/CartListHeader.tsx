import { useRecoilValueLoadable } from 'recoil';

import { cartListItemCountState } from '../../../store/cart';
import Checkbox from '../../common/Checkbox/Checkbox';
import * as S from './CartListHeader.styles';

const CartListHeader = () => {
  const cartListItemCount = useRecoilValueLoadable(cartListItemCountState);

  return (
    <S.CartListHeaderContainer>
      <Checkbox isChecked={true} />
      <S.CartItemAllSelectText>
        전체선택 ({cartListItemCount.state === 'hasValue' ? cartListItemCount.contents : 0}/
        {cartListItemCount.state === 'hasValue' ? cartListItemCount.contents : 0})
      </S.CartItemAllSelectText>
      <S.VerticalLine />
      <S.CartItemPartialSelectText>선택삭제</S.CartItemPartialSelectText>
    </S.CartListHeaderContainer>
  );
};

export default CartListHeader;
