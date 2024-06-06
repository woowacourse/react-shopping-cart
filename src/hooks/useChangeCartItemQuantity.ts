import { useSetRecoilState } from "recoil";
import { patchCartItemQuantityChange } from "../api";
import { CART, ERROR_MESSAGES } from "../constants";
import { cartItemsState } from "../recoil/atoms/atoms";
import { CartItem } from "../types";

type CartItemQuantity = Pick<CartItem, "id" | "quantity">;

export const useChangeCartItemQuantity = () => {
  const setCartItems = useSetRecoilState(cartItemsState);

  const incrementQuantity = async ({ id, quantity }: CartItemQuantity) => {
    const newQuantity = quantity + CART.QUANTITY_CHANGE_STEP;
    try {
      await patchCartItemQuantityChange(id, newQuantity);
      setCartItems((prevItems) =>
        prevItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
      );
    } catch (error) {
      console.error(ERROR_MESSAGES.PLUS_CART_ITEM, error);
    }
  };

  const decrementQuantity = async ({ id, quantity }: CartItemQuantity) => {
    const newQuantity = quantity - CART.QUANTITY_CHANGE_STEP;
    if (newQuantity > 0) {
      try {
        await patchCartItemQuantityChange(id, newQuantity);
        setCartItems((prevItems) =>
          prevItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
        );
      } catch (error) {
        console.error(ERROR_MESSAGES.MINUS_CART_ITEM, error);
      }
    }
  };

  return { incrementQuantity, decrementQuantity };
};
