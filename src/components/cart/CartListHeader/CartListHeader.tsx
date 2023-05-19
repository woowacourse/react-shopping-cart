import { useCallback } from 'react';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';

import { CART_LIST_CHECKBOX_KEY } from '../../../constants/store';
import { useCart } from '../../../hooks/useCart';
import { cartListItemCountState } from '../../../store/cart';
import {
  checkedItemCountState,
  checkedListState,
  isAllCheckedState,
} from '../../../store/checkbox';
import Checkbox from '../../common/Checkbox/Checkbox';
import * as S from './CartListHeader.styles';

const CartListHeader = () => {
  const cartListItemCount = useRecoilValueLoadable(cartListItemCountState);
  const checkedItemCount = useRecoilValue(checkedItemCountState(CART_LIST_CHECKBOX_KEY));
  const checkedIdList = useRecoilValue(checkedListState(CART_LIST_CHECKBOX_KEY));
  const [isAllChecked, setIsAllChecked] = useRecoilState(isAllCheckedState(CART_LIST_CHECKBOX_KEY));
  const { removeCheckedItems } = useCart();

  const onCheckboxClick = useCallback(() => {
    setIsAllChecked(!isAllChecked);
  }, [isAllChecked, setIsAllChecked]);

  const deleteCheckedItems = useCallback(() => {
    removeCheckedItems(Array.from(checkedIdList));
  }, [checkedIdList, removeCheckedItems]);

  return (
    <S.CartListHeaderContainer>
      <Checkbox isChecked={isAllChecked} onClick={onCheckboxClick} />
      <S.CartItemAllSelectText>
        전체선택 ({checkedItemCount}/
        {cartListItemCount.state === 'hasValue' ? cartListItemCount.contents : 0})
      </S.CartItemAllSelectText>
      <S.VerticalLine />
      <S.CartItemPartialSelectText onClick={deleteCheckedItems}>
        선택삭제
      </S.CartItemPartialSelectText>
    </S.CartListHeaderContainer>
  );
};

export default CartListHeader;
