import { useSetRecoilState } from "recoil";
import { patchCartItemQuantityChange } from "../api";
import { CART, COUNTER_BUTTON_TYPES, ERROR_MESSAGES } from "../constants";
import { cartItemsState } from "../recoil/atoms/atoms";
import { CartItem } from "../types";

type CartItemQuantity = Pick<CartItem, "id" | "quantity">;
type Action = (typeof COUNTER_BUTTON_TYPES)[keyof typeof COUNTER_BUTTON_TYPES];

export const useChangeCartItemQquntity = () => {
  const setCartItems = useSetRecoilState(cartItemsState);

  const handleItemCountChange = async ({ id, quantity }: CartItemQuantity, action: Action) => {
    const changeStep = CART.QUANTITY_CHANGE_STEP;
    const newQuantity =
      action === COUNTER_BUTTON_TYPES.INCREMENT ? quantity + changeStep : quantity - changeStep;

    if (newQuantity > 0) {
      try {
        await patchCartItemQuantityChange(id, newQuantity);
        setCartItems((prevItems) =>
          prevItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
        );
      } catch (error) {
        const errorMessage =
          action === COUNTER_BUTTON_TYPES.INCREMENT
            ? ERROR_MESSAGES.PLUS_CART_ITEM
            : ERROR_MESSAGES.MINUS_CART_ITEM;
        console.error(errorMessage, error);
      }
    }
  };

  return handleItemCountChange;
};
