import { useSelector } from "react-redux";
import { CartItem } from "../redux/modules/cart";
import { RootState } from "../redux/store";

const selectCartItemById = (state: RootState, targetId: number) => {
  return state.cart.items.find((item) => item.id === targetId);
};

const getSelectedItemAmount = (state: RootState) => {
  return state.cart.items
    .filter((item) => item.isSelected)
    .reduce((acc: number, cur: CartItem) => acc + cur.amount * cur.price, 0);
};

const useCartListSelector = () => useSelector((state: RootState) => state.cart.items);

const useCartItemSelector = (id: number) =>
  useSelector((state: RootState) => selectCartItemById(state, id));

const useCartAmount = () => useSelector((state: RootState) => getSelectedItemAmount(state));

export { useCartItemSelector, useCartListSelector, useCartAmount };
