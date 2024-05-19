import { useSetRecoilState } from "recoil";
import { fetchCartItems, removeCartItem, updateCartItemQuantity } from "../../api/cartItems";
import { CartItemId } from "../../types/cartItems";
import { rawCartItemsState } from "../../recoil/rawCartItems";
import { selectedCartItemIdsState } from "../../recoil/selectedCartItemIds";

export interface UseCartItemsReturn {
  remove: (cartItemId: CartItemId) => void;
  updateQuantity: (cartItemId: CartItemId, quantity: number) => void;
  toggleSelection: (cartItemId: CartItemId) => void;
}

export const useCartItemControl = (): UseCartItemsReturn => {
  const setRawCartItems = useSetRecoilState(rawCartItemsState);
  const setSelectedCartItemIds = useSetRecoilState(selectedCartItemIdsState);

  const refreshCartItems = async () => {
    const cartItems = await fetchCartItems();
    setRawCartItems(cartItems);
  };

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
