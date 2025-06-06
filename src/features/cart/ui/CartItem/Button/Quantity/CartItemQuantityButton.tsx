import * as S from './CartItemQuantityButton.styled';
import PlusIcon from '@assets/icons/plus.svg';
import MinusIcon from '@assets/icons/minus.svg';
import RemoveCartItemButton from '../Remove/RemoveCartItemButton';
import { useCartContext } from '@/features/cart/model/provider/CartProvider';

interface CartItemQuantityButtonProps {
  cartItemId: number;
  quantity: number;
  removeOrderItemId: (id: number) => void;
}

function CartItemQuantityButton({
  cartItemId,
  quantity,
  removeOrderItemId,
}: CartItemQuantityButtonProps) {
  const { updateItemQuantity } = useCartContext();

  const updateCartItem = async (updateQuantity: number) => {
    await updateItemQuantity(cartItemId, updateQuantity);
  };

  return (
    <S.ButtonWrapper>
      {quantity === 1 ? (
        <RemoveCartItemButton cartItemId={cartItemId} removeOrderItemId={removeOrderItemId} />
      ) : (
        <S.Button type="button" onClick={() => updateCartItem(quantity - 1)}>
          <img src={MinusIcon} alt="수량 1개 빼기" />
        </S.Button>
      )}
      <S.QuantityText data-testid="current-cart-item-quantity">{quantity}</S.QuantityText>
      <S.Button type="button" onClick={() => updateCartItem(quantity + 1)}>
        <img src={PlusIcon} alt="수량 1개 추가" />
      </S.Button>
    </S.ButtonWrapper>
  );
}

export default CartItemQuantityButton;
