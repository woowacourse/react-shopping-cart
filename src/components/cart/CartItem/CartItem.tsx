import { memo, useCallback } from 'react';
import { useRecoilValue } from 'recoil';

import { CloseIcon } from '../../../assets';
import { useModal } from '../../../hooks/common/useModal';
import { useCartCheckbox } from '../../../hooks/useCartCheckbox';
import { checkedCartItemState } from '../../../store/cartCheckbox';
import { ProductItemData } from '../../../types';
import { priceFormatter } from '../../../utils/formatter';
import Checkbox from '../../common/Checkbox/Checkbox';
import Modal from '../../common/Modal/Modal';
import StepperButton from '../../common/StepperButton/StepperButton';
import CartItemDelete from '../CartItemDelete/CartItemDelete';
import * as S from './CartItem.styles';
import { useCart } from '../../../hooks/useCart';

interface CartItemProps extends ProductItemData {
  quantity: number;
}

const CartItem = ({ id, quantity, name, price, imageUrl }: CartItemProps) => {
  const isChecked = useRecoilValue(checkedCartItemState(id));
  const { updateItemQuantity, removeItem } = useCart();
  const { toggleItemCheckbox } = useCartCheckbox();
  const { isModalOpen, handleModalOpen, handleModalClose } = useModal();

  const onCheckboxChange = useCallback(() => {
    toggleItemCheckbox(id);
  }, [id, toggleItemCheckbox]);

  const handleQuantityChange = useCallback(
    (quantity: number) => {
      updateItemQuantity({ productId: id, quantity });
    },
    [updateItemQuantity, id]
  );

  const handleRemoval = useCallback(() => {
    handleModalClose();
    removeItem(id);
  }, [handleModalClose, id, removeItem]);

  return (
    <S.CartItemContainer>
      <Checkbox checked={isChecked} onChange={onCheckboxChange} />
      <S.CartItemImageWrapper>
        <S.CartItemImage src={imageUrl} alt={name} />
      </S.CartItemImageWrapper>
      <S.CartItemName>{name}</S.CartItemName>
      <StepperButton
        className="stepper-button"
        count={quantity}
        handleCountChange={handleQuantityChange}
      />
      <S.CartItemPrice>{priceFormatter(price * quantity)}원</S.CartItemPrice>
      <S.CartItemDeleteButton aria-label="상품 삭제" variant="textButton" onClick={handleModalOpen}>
        <CloseIcon />
      </S.CartItemDeleteButton>
      <Modal isOpen={isModalOpen} handleClose={handleModalClose}>
        <CartItemDelete handleModalClose={handleModalClose} removeItem={handleRemoval} />
      </Modal>
    </S.CartItemContainer>
  );
};

export default memo(CartItem);
