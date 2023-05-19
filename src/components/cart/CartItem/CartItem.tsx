import { memo } from 'react';

import { CloseIcon } from '../../../assets';
import { useCount } from '../../../hooks/common/useCount';
import { useCartItem } from '../../../hooks/useCartItem';
import { ProductItemData } from '../../../types';
import { priceFormatter } from '../../../utils/formatter';
import StepperButton from '../../common/StepperButton/StepperButton';
import * as S from './CartItem.styles';

interface CartItemProps extends ProductItemData {
  quantity: number;
}

const CartItem = ({ id, quantity, name, price, imageUrl }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCartItem(id);

  return (
    <S.CartItemContainer>
      <S.CartItemImageWrapper>
        <S.CartItemImage src={product.imageUrl} alt={product.name} loading="lazy" />
      </S.CartItemImageWrapper>
      <S.CartItemName>{product.name}</S.CartItemName>
      <StepperButton
        count={count}
        handleDecreaseCount={handleDecreaseCount}
        handleIncreaseCount={handleIncreaseCount}
        handleCountChange={handleCountChange}
      />
      <S.CartItemPrice>{priceFormatter(price * quantity)}원</S.CartItemPrice>
      <S.CartItemDeleteButton variant="textButton" onClick={removeItem}>
        <CloseIcon />
      </S.CartItemDeleteButton>
    </S.CartItemContainer>
  );
};

export default memo(CartItem);
