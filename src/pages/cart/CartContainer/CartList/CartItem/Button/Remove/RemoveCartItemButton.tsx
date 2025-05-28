import RemoveCartItemIcon from '@assets/icons/remove-cart-item.svg';
import * as S from './RemoveCartItemButton.styled';
import { deleteCartItem } from '@/apis/cartItems/deleteCartItem';
import useMutation from '@/shared/hooks/useMutation';

type RemoveCartItemButtonProps = {
  cartItemId: number;
  refetchCartItems: () => Promise<void>;
};

function RemoveCartItemButton({ cartItemId, refetchCartItems }: RemoveCartItemButtonProps) {
  const { mutate: removeCartItemMutate } = useMutation(() => deleteCartItem(cartItemId));

  const removeCartItem = async () => {
    await removeCartItemMutate(undefined);
    refetchCartItems();
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
