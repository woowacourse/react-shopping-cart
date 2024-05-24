import { useSetRecoilState } from "recoil";
import { removeCartItem, updateCartItemQuantity } from "../../api/cartItems";
import { CartItemId } from "../../types/cartItems";
import { selectedCartItemIdsState } from "../../recoil/selectedCartItemIds";
import { useRefreshCartItems } from "../useRefreshCartItems";

export interface UseCartItemsReturn {
  remove: (cartItemId: CartItemId) => void;
  updateQuantity: (cartItemId: CartItemId, quantity: number) => void;
  toggleSelection: (cartItemId: CartItemId) => void;
}

export const useCartItemControl = (): UseCartItemsReturn => {
  const setSelectedCartItemIds = useSetRecoilState(selectedCartItemIdsState);
  const refreshCartItems = useRefreshCartItems();

  const removeSelectedCartItemId = (cartItemId: CartItemId) => {
    setSelectedCartItemIds((prev) => prev.filter((id) => id !== cartItemId));
  };

  const remove = async (cartItemId: CartItemId) => {
    await removeCartItem(cartItemId);
    await refreshCartItems();

    removeSelectedCartItemId(cartItemId);
  };

  const updateQuantity = async (cartItemId: CartItemId, quantity: number) => {
    if (quantity < 1) return;

    await updateCartItemQuantity(cartItemId, quantity);
    await refreshCartItems();
  };

  const toggleSelection = (cartItemId: CartItemId) => {
    setSelectedCartItemIds((prev) => {
      const isSelected = prev.includes(cartItemId);
      return isSelected ? prev.filter((id) => id !== cartItemId) : [...prev, cartItemId];
    });
  };

  return {
    remove,
    updateQuantity,
    toggleSelection,
  };
};
