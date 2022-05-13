import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const selectCartItemById = (state: RootState, targetId: number) => {
  return state.cart.cartItemList.find((cartItem) => cartItem.id === targetId);
};

const useCartListSelector = () => useSelector((state: RootState) => state.cart.cartItemList);
const useCartItemSelector = (id: number) =>
  useSelector((state: RootState) => selectCartItemById(state, id));

export { useCartItemSelector, useCartListSelector };
