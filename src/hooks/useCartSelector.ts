import { useSelector } from "react-redux";
import { RootState } from "redux/store";

const findCartItemById = (state: RootState, targetId: number) => {
  return state.cart.cartItemList.find((cartItem) => cartItem.detail.id === targetId);
};

const findSelectedCartItems = (state: RootState) => {
  return state.cart.cartItemList.filter((cartItem) => cartItem.isSelected);
};

const useCartItemListSelector = () => useSelector((state: RootState) => state.cart.cartItemList);

const useCartItemSelector = (id: number) =>
  useSelector((state: RootState) => findCartItemById(state, id));

const useSelectedCartItemSelector = () =>
  useSelector((state: RootState) => findSelectedCartItems(state));

export { useCartItemSelector, useCartItemListSelector, useSelectedCartItemSelector };
