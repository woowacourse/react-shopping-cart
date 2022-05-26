import { useSelector } from "react-redux";
import { CartItem } from "redux/modules/cart";
import { RootState } from "redux/store";

const findCartItemById = (cartItemList: CartItem[], targetId: number) =>
  cartItemList.find((cartItem) => cartItem.detail.id === targetId);

const findSelectedCartItems = (cartItemList: CartItem[]) =>
  cartItemList.filter((cartItem) => cartItem.isSelected);

const useCartItemListSelector = () => useSelector((state: RootState) => state.cart.cartItemList);

const useCartItemSelector = (id: number) => {
  const cartItemList = useSelector((state: RootState) => state.cart.cartItemList);

  return findCartItemById(cartItemList, id);
};

const useSelectedCartItemSelector = () => {
  const cartItemList = useSelector((state: RootState) => state.cart.cartItemList);

  return findSelectedCartItems(cartItemList);
};

export { useCartItemSelector, useCartItemListSelector, useSelectedCartItemSelector };
