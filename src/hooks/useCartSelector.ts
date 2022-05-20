import { useSelector } from "react-redux";
import { CartItem } from "../redux/modules/cart";
import { RootState } from "../redux/store";

const selectCartItemById = (state: RootState, targetId: number) => {
  return state.cart.cartItems.find((item) => item.id === targetId);
};

const test = (state: RootState) => {
  return state.cart.cartItems
    .filter((item) => item.isSelected)
    .reduce((acc: number, cur: CartItem) => acc + cur.amount * cur.price, 0);
};

const useCartListSelector = () => useSelector((state: RootState) => state.cart.cartItems);

const useCartItemSelector = (id: number) =>
  useSelector((state: RootState) => selectCartItemById(state, id));

const useCartAmount = () => useSelector((state: RootState) => test(state));

export { useCartItemSelector, useCartListSelector, useCartAmount };
