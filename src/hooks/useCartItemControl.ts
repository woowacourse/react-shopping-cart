import { useRecoilState, useSetRecoilState } from "recoil";
import { removeCartItem, updateCartItemQuantity } from "../api/cartItems";
import { CartItemId } from "../types/cartItems";
import { rawCartItemsState } from "../recoil/cart/rawCartItems";
import { selectedCartItemIdsState } from "../recoil/cart/selectedCartItemIds";

export interface UseCartItemsReturn {
  remove: (cartItemId: CartItemId) => void;
  updateQuantity: (cartItemId: CartItemId, quantity: number) => void;
  toggleSelection: (cartItemId: CartItemId) => void;
}

export const useCartItemControl = (): UseCartItemsReturn => {
  const [rawCartItems, setRawCartItems] = useRecoilState(rawCartItemsState);
  const setSelectedCartItemIds = useSetRecoilState(selectedCartItemIdsState);

  const remove = async (cartItemId: CartItemId) => {
    await removeCartItem(cartItemId);

    setSelectedCartItemIds((prev) => prev.filter((id) => id !== cartItemId));

    const filteredCartItems = rawCartItems.filter(
      (cartItem) => cartItem.id !== cartItemId
    );
    setRawCartItems(filteredCartItems);
  };

  const updateQuantity = async (cartItemId: CartItemId, quantity: number) => {
    if (quantity < 1) return;

    await updateCartItemQuantity(cartItemId, quantity);

    const updatedCartItems = rawCartItems.map((cartItem) =>
      cartItem.id === cartItemId ? { ...cartItem, quantity } : cartItem
    );
    setRawCartItems(updatedCartItems);
  };

  const toggleSelection = (cartItemId: CartItemId) => {
    setSelectedCartItemIds((prev) => {
      const isSelected = prev.includes(cartItemId);
      return isSelected
        ? prev.filter((id) => id !== cartItemId)
        : [...prev, cartItemId];
    });
  };

  return {
    remove,
    updateQuantity,
    toggleSelection,
  };
};
