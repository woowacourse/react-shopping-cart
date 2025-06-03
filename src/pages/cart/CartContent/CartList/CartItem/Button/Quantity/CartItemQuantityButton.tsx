import * as S from './CartItemQuantityButton.styled';
import PlusIcon from '@assets/icons/plus.svg';
import MinusIcon from '@assets/icons/minus.svg';
import RemoveCartItemButton from '../Remove/RemoveCartItemButton';
import useMutation from '@/shared/hooks/useMutation';
import { updateCartItemQuantity } from '@/apis/cartItems/updateCartItemQuantity';

interface CartItemQuantityButtonProps {
  cartItemId: number;
  quantity: number;
  refetchCartItems: () => Promise<void>;
  removeOrderItemId: (id: number) => void;
}

function CartItemQuantityButton({
  cartItemId,
  quantity,
  refetchCartItems,
  removeOrderItemId,
}: CartItemQuantityButtonProps) {
  const { mutate: updateCartItemMutate } = useMutation(updateCartItemQuantity);

  const updateCartItem = async (updateQuantity: number) => {
    await updateCartItemMutate({
      id: cartItemId,
      quantity: updateQuantity,
    });
    refetchCartItems();
  };

  return (
    <S.ButtonWrapper>
      {quantity === 1 ? (
        <RemoveCartItemButton
          cartItemId={cartItemId}
          refetchCartItems={refetchCartItems}
          removeOrderItemId={removeOrderItemId}
        />
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
