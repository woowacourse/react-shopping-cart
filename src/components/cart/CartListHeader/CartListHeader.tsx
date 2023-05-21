import { useCallback } from 'react';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';

import { CART_LIST_CHECKBOX_KEY } from '../../../constants/store';
import { useModal } from '../../../hooks/common/useModal';
import { useCart } from '../../../hooks/useCart';
import { cartListItemCountState } from '../../../store/cart';
import {
  checkedItemCountState,
  checkedListState,
  isAllCheckedState,
} from '../../../store/checkbox';
import Checkbox from '../../common/Checkbox/Checkbox';
import Modal from '../../common/Modal/Modal';
import CartItemDelete from '../CartItemDelete/CartItemDelete';
import * as S from './CartListHeader.styles';

const CartListHeader = () => {
  const cartListItemCount = useRecoilValueLoadable(cartListItemCountState);
  const checkedItemCount = useRecoilValue(checkedItemCountState(CART_LIST_CHECKBOX_KEY));
  const checkedIdList = useRecoilValue(checkedListState(CART_LIST_CHECKBOX_KEY));
  const [isAllChecked, setIsAllChecked] = useRecoilState(isAllCheckedState(CART_LIST_CHECKBOX_KEY));
  const { removeCheckedItems } = useCart();
  const { isModalOpen, handleModalOpen, handleModalClose } = useModal();

  const onCheckboxClick = useCallback(() => {
    setIsAllChecked(!isAllChecked);
  }, [isAllChecked, setIsAllChecked]);

  const deleteCheckedItems = useCallback(() => {
    removeCheckedItems(Array.from(checkedIdList));
    handleModalClose();
  }, [checkedIdList, handleModalClose, removeCheckedItems]);

  return (
    <S.CartListHeaderContainer>
      <Checkbox isChecked={isAllChecked} onClick={onCheckboxClick} />
      <S.CartItemAllSelectText>
        전체선택 ({checkedItemCount}/
        {cartListItemCount.state === 'hasValue' ? cartListItemCount.contents : 0})
      </S.CartItemAllSelectText>
      <S.VerticalLine />
      <S.CartItemPartialSelectDeleteButton
        disabled={checkedIdList.size === 0}
        onClick={handleModalOpen}
        as="button"
      >
        선택삭제
      </S.CartItemPartialSelectDeleteButton>
      <Modal isOpen={isModalOpen} handleClose={handleModalClose}>
        <CartItemDelete handleModalClose={handleModalClose} removeItem={deleteCheckedItems} />
      </Modal>
    </S.CartListHeaderContainer>
  );
};

export default CartListHeader;
