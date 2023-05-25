import { memo, useCallback } from 'react';
import { useRecoilValue } from 'recoil';

import { CloseIcon } from '../../../assets';
import { useModal } from '../../../hooks/common/useModal';
import { useCartCheckbox } from '../../../hooks/useCartCheckbox';
import { useCartItem } from '../../../hooks/useCartItem';
import { checkedCartItemState } from '../../../store/cartCheckbox';
import { ProductItemData } from '../../../types';
import { priceFormatter } from '../../../utils/formatter';
import Checkbox from '../../common/Checkbox/Checkbox';
import Modal from '../../common/Modal/Modal';
import StepperButton from '../../common/StepperButton/StepperButton';
import CartItemDelete from '../CartItemDelete/CartItemDelete';
import * as S from './CartItem.styles';

interface CartItemProps extends ProductItemData {
  quantity: number;
}

const CartItem = ({ id, quantity, name, price, imageUrl }: CartItemProps) => {
  const isChecked = useRecoilValue(checkedCartItemState(id));
  const { updateQuantity, removeItem } = useCartItem(id);
  const { toggleItemCheckbox } = useCartCheckbox();
  const { isModalOpen, handleModalOpen, handleModalClose } = useModal();

  const onCheckboxClick = useCallback(() => {
    toggleItemCheckbox(id);
  }, [id, toggleItemCheckbox]);

  return (
    <S.CartItemContainer>
      <Checkbox checked={isChecked} onClick={onCheckboxClick} />
      <S.CartItemImageWrapper>
        <S.CartItemImage src={imageUrl} alt={name} />
      </S.CartItemImageWrapper>
      <S.CartItemName>{name}</S.CartItemName>
      <StepperButton
        className="stepper-button"
        count={quantity}
        handleCountChange={updateQuantity}
      />
      <S.CartItemPrice>{priceFormatter(price * quantity)}원</S.CartItemPrice>
      <S.CartItemDeleteButton aria-label="상품 삭제" variant="textButton" onClick={handleModalOpen}>
        <CloseIcon />
      </S.CartItemDeleteButton>
      <Modal isOpen={isModalOpen} handleClose={handleModalClose}>
        <CartItemDelete handleModalClose={handleModalClose} removeItem={removeItem} />
      </Modal>
    </S.CartItemContainer>
  );
};

export default memo(CartItem);
