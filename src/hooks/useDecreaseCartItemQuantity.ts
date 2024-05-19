import { useSetRecoilState } from "recoil";
import { patchCartItemQuantityChange } from "../api";
import { CART, ERROR_MESSAGES } from "../constants";
import { cartItemsState } from "../recoil/atoms/atoms";

interface CartItemQuantity {
  id: number;
  quantity: number;
}

export const useDecreaseCartItemQuantity = () => {
  const setCartItems = useSetRecoilState(cartItemsState);

  const handleItemCountMinus = async ({ id, quantity }: CartItemQuantity) => {
    if (quantity > 1) {
      try {
        const newQuantity = quantity - CART.QUANTITY_CHANGE_STEP;
        await patchCartItemQuantityChange(id, newQuantity);
        setCartItems((prevItems) =>
          prevItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
        );
      } catch (error) {
        console.error(ERROR_MESSAGES.MINUS_CART_ITEM, error);
      }
    }
  };

  return handleItemCountMinus;
};
