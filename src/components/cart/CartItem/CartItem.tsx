import { memo, useCallback } from 'react';

import { CloseIcon } from '../../../assets';
import { useCartItem } from '../../../hooks/useCartItem';
import { ProductItemData } from '../../../types';
import { priceFormatter } from '../../../utils/formatter';
import Checkbox from '../../common/Checkbox/Checkbox';
import StepperButton from '../../common/StepperButton/StepperButton';
import * as S from './CartItem.styles';

interface CartItemProps extends ProductItemData {
  quantity: number;
}

const CartItem = ({ id, quantity, name, price, imageUrl }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCartItem(id);

  const handleQuantityDecrement = useCallback(() => {
    updateQuantity(quantity - 1);
  }, [quantity, updateQuantity]);

  const handleQuantityIncrement = useCallback(() => {
    updateQuantity(quantity + 1);
  }, [quantity, updateQuantity]);

  return (
    <S.CartItemContainer>
      <Checkbox isChecked={true} />
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
      <S.CartItemDeleteButton variant="textButton" onClick={removeItem}>
        <CloseIcon />
      </S.CartItemDeleteButton>
    </S.CartItemContainer>
  );
};

export default memo(CartItem);
