import * as S from './CartItemQuantitySelector.styles';
import { CartItem } from '../type/cart';
import { useCartItemsContext } from '../context/useCartItemsContext';

interface CartItemQuantitySelectorProps {
  cartItem: CartItem;
}

export default function CartItemQuantitySelector({ cartItem }: CartItemQuantitySelectorProps) {
  const { increaseCartItemQuantity, decreaseCartItemQuantity } = useCartItemsContext();

  return (
    <S.CartItemQuantityContainer>
      <S.CartItemQuantitySelectorButton
        onClick={cartItem.quantity > 1 ? () => decreaseCartItemQuantity(cartItem.id) : undefined}
      >
        -
      </S.CartItemQuantitySelectorButton>
      <S.CartItemQuantityNumber data-testid="card-item-quantity">{cartItem.quantity}</S.CartItemQuantityNumber>
      <S.CartItemQuantitySelectorButton onClick={() => increaseCartItemQuantity(cartItem.id)}>
        +
      </S.CartItemQuantitySelectorButton>
    </S.CartItemQuantityContainer>
  );
}
