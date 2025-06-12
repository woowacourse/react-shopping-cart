import { useCartItemsContext } from '../context/useCartItemsContext';
import { useSelectedCartItemsContext } from '../context/useSelectedCartItemsContext';
import { deleteCartItem } from '../api/deleteCartItem';
import { CartItem } from '../types/cart';

export const useCartItemActions = (cartItem: CartItem) => {
  const { fetchCartItems } = useCartItemsContext();
  const { selectedCartItems, addSelectedCartItem, removeSelectedCartItem } = useSelectedCartItemsContext();

  const isSelected = selectedCartItems.find((item) => item.id === cartItem.id) !== undefined;

  const handleSelectedCartItemsItemUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (!isChecked) {
      removeSelectedCartItem(cartItem);
      return;
    }
    addSelectedCartItem(cartItem, cartItem.quantity);
  };

  const handleCartItemDelete = async () => {
    try {
      await deleteCartItem(cartItem.id);
      removeSelectedCartItem(cartItem);
      await fetchCartItems();
    } catch (error) {
      if (error instanceof Error) {
        console.error('장바구니 아이템 삭제 실패:', error.message);
        alert('장바구니 아이템 삭제에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  return {
    isSelected,
    handleSelectedCartItemsItemUpdate,
    handleCartItemDelete,
  };
};
