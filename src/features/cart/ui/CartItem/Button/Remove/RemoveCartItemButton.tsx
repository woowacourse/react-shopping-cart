import RemoveCartItemIcon from '@assets/icons/remove-cart-item.svg';
import * as S from './RemoveCartItemButton.styled';
import { useCartContext } from '@/features/cart/model/provider/CartProvider';

interface RemoveCartItemButtonProps {
  cartItemId: number;
  removeOrderItemId: (id: number) => void;
}

function RemoveCartItemButton({ cartItemId, removeOrderItemId }: RemoveCartItemButtonProps) {
  const { removeItem } = useCartContext();

  const removeCartItem = async () => {
    await removeItem(cartItemId);
    removeOrderItemId(cartItemId);
  };

  return (
    <>
      <S.Button type="button" onClick={removeCartItem}>
        <img src={RemoveCartItemIcon} alt="장바구니에서 제거" />
      </S.Button>
    </>
  );
}

export default RemoveCartItemButton;
