import { useCallback } from 'react';
import { useRecoilValueLoadable } from 'recoil';

import { useModal } from '../../../hooks/common/useModal';
import { useCart } from '../../../hooks/useCart';
import { useCartCheckbox } from '../../../hooks/useCartCheckbox';
import { cartListItemCountState } from '../../../store/cart';
import { checkedCartIdListState, isCartAllCheckedState } from '../../../store/cartCheckbox';
import Checkbox from '../../common/Checkbox/Checkbox';
import Modal from '../../common/Modal/Modal';
import CartItemDelete from '../CartItemDelete/CartItemDelete';
import * as S from './CartListHeader.styles';

const CartListHeader = () => {
  const cartListItemCount = useRecoilValueLoadable(cartListItemCountState);
  const checkedCartItems = useRecoilValueLoadable(checkedCartIdListState);
  const isCartAllChecked = useRecoilValueLoadable(isCartAllCheckedState);

  const { removeCheckedItems } = useCart();
  const { toggleAllCheckbox } = useCartCheckbox();
  const { isModalOpen, handleModalOpen, handleModalClose } = useModal();

  const onCheckboxClick = useCallback(() => {
    toggleAllCheckbox();
  }, [toggleAllCheckbox]);

  const deleteCheckedItems = useCallback(() => {
    removeCheckedItems([...checkedCartItems.contents]);
    handleModalClose();
  }, [checkedCartItems, handleModalClose, removeCheckedItems]);

  return (
    <S.CartListHeaderContainer>
      <Checkbox
        id="전체 선택 체크박스"
        checked={isCartAllChecked.state === 'hasValue' && isCartAllChecked.contents}
        onChange={onCheckboxClick}
      />
      <S.CartItemAllSelectText>
        전체선택 ({cartListItemCount.state === 'hasValue' ? checkedCartItems.contents.size : 0}/
        {cartListItemCount.state === 'hasValue' ? cartListItemCount.contents : 0})
      </S.CartItemAllSelectText>
      <S.VerticalLine />
      <S.CartItemPartialSelectDeleteButton
        disabled={checkedCartItems.state === 'loading' || checkedCartItems.contents.size === 0}
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
