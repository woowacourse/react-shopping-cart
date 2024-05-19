import { useSetRecoilState } from "recoil";
import { patchCartItemQuantityChange } from "../api";
import { CART, ERROR_MESSAGES } from "../constants";
import { cartItemsState } from "../recoil/atoms/atoms";

interface CartItemQuantity {
  id: number;
  quantity: number;
}

export const useIncreaseCartItemQuantity = () => {
  const setCartItems = useSetRecoilState(cartItemsState);

  const handleItemCountPlus = async ({ id, quantity }: CartItemQuantity) => {
    try {
      const newQuantity = quantity + CART.QUANTITY_CHANGE_STEP;
      await patchCartItemQuantityChange(id, newQuantity);
      setCartItems((prevItems) =>
        prevItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
      );
    } catch (error) {
      console.error(ERROR_MESSAGES.PLUS_CART_ITEM, error);
    }
  };

  return handleItemCountPlus;
};
