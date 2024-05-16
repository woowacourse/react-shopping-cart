import { useRecoilState, useSetRecoilState } from "recoil";
import { removeCartItem, updateCartItemQuantity } from "../api/cartItems";
import { CartItemId } from "../types/cartItems";
import { rawCartItemsState } from "../recoil/rawCartItems";
import { selectedCartItemIdsState } from "../recoil/selectedCartItemIds";

interface UseCartItemsReturn {
  remove: () => void;
  updateQuantity: (quantity: number) => void;
  toggleSelection: () => void;
}

export const useCartItemControl = (cartItemId: CartItemId): UseCartItemsReturn => {
  const [rawCartItems, setRawCartItems] = useRecoilState(rawCartItemsState);
  const setSelectedCartItemIds = useSetRecoilState(selectedCartItemIdsState);

  const remove = async () => {
    await removeCartItem(cartItemId);

    setSelectedCartItemIds((prev) => prev.filter((id) => id !== cartItemId));

    const filteredCartItems = rawCartItems.filter((cartItem) => cartItem.id !== cartItemId);
    setRawCartItems(filteredCartItems);
  };

  const updateQuantity = async (quantity: number) => {
    if (quantity < 1) return;

    await updateCartItemQuantity(cartItemId, quantity);

    const updatedCartItems = rawCartItems.map((cartItem) =>
      cartItem.id === cartItemId ? { ...cartItem, quantity } : cartItem
    );
    setRawCartItems(updatedCartItems);
  };

  const toggleSelection = () => {
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
