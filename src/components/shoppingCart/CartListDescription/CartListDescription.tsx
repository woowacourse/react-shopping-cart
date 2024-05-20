import { CartItem } from '@appTypes/shoppingCart';
import { CountButton } from '@components/common';
import { useUpdateCartItemCount } from '@hooks/shoppingCart';
import { formatKoreanCurrency } from '@utils/index';

import * as Styled from './CartListDescription.styled';

interface CartListDescriptionContainerProps {
  cartItem: CartItem;
}

const CartListDescription: React.FC<CartListDescriptionContainerProps> = ({ cartItem }) => {
  const { product, quantity } = cartItem;

  const { onUpdateCartItemCount } = useUpdateCartItemCount(cartItem);

  return (
    <Styled.CartItemDescriptionWrapper>
      <Styled.CartItemDescriptionTitle>{product.name}</Styled.CartItemDescriptionTitle>
      <Styled.CartItemDescriptionPrice>{formatKoreanCurrency(product.price)}</Styled.CartItemDescriptionPrice>
      <Styled.CartItemButtonGroup>
        <CountButton onClick={() => onUpdateCartItemCount('minus')} sign="minus" />
        <span>{quantity}</span>
        <CountButton onClick={() => onUpdateCartItemCount('plus')} sign="plus" />
      </Styled.CartItemButtonGroup>
    </Styled.CartItemDescriptionWrapper>
  );
};

export default CartListDescription;
