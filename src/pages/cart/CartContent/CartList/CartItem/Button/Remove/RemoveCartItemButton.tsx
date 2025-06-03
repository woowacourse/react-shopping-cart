import RemoveCartItemIcon from '@assets/icons/remove-cart-item.svg';
import * as S from './RemoveCartItemButton.styled';
import { deleteCartItem } from '@/apis/cartItems/deleteCartItem';
import useMutation from '@/shared/hooks/useMutation';

interface RemoveCartItemButtonProps {
  cartItemId: number;
  refetchCartItems: () => Promise<void>;
  removeOrderItemId: (id: number) => void;
}

function RemoveCartItemButton({
  cartItemId,
  refetchCartItems,
  removeOrderItemId,
}: RemoveCartItemButtonProps) {
  const { mutate: removeCartItemMutate } = useMutation(() => deleteCartItem(cartItemId));

  const removeCartItem = async () => {
    await removeCartItemMutate(undefined);
    refetchCartItems();
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
