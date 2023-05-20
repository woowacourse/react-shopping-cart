import { memo, useCallback } from 'react';

import { CloseIcon } from '../../../assets';
import { CART_LIST_CHECKBOX_KEY } from '../../../constants/store';
import { useCheckbox } from '../../../hooks/common/useCheckbox';
import { useModal } from '../../../hooks/common/useModal';
import { useCartItem } from '../../../hooks/useCartItem';
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
  const { updateQuantity, removeItem } = useCartItem(id);
  const { isChecked, toggleItemCheckbox } = useCheckbox(CART_LIST_CHECKBOX_KEY, id);
  const { isModalOpen, handleModalOpen, handleModalClose } = useModal();

  const handleQuantityDecrement = useCallback(() => {
    updateQuantity(quantity - 1);
  }, [quantity, updateQuantity]);

  const handleQuantityIncrement = useCallback(() => {
    updateQuantity(quantity + 1);
  }, [quantity, updateQuantity]);

  return (
    <S.CartItemContainer>
      <Checkbox isChecked={isChecked} onClick={toggleItemCheckbox} />
      <S.CartItemImageWrapper>
        <S.CartItemImage src={imageUrl} alt={name} />
      </S.CartItemImageWrapper>
      <S.CartItemName>{name}</S.CartItemName>
      <StepperButton
        count={quantity}
        handleDecreaseCount={handleQuantityDecrement}
        handleIncreaseCount={handleQuantityIncrement}
        handleCountChange={updateQuantity}
      />
      <S.CartItemPrice>{priceFormatter(price * quantity)}원</S.CartItemPrice>
      <S.CartItemDeleteButton variant="textButton" onClick={handleModalOpen}>
        <CloseIcon />
      </S.CartItemDeleteButton>
      <Modal isOpen={isModalOpen} handleClose={handleModalClose}>
        <CartItemDelete handleModalClose={handleModalClose} removeItem={removeItem} />
      </Modal>
    </S.CartItemContainer>
  );
};

export default memo(CartItem);
