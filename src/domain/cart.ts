import {CartItem, ReceivedCartItem} from "../types/types";

export const updateCartListQuantity = (cartList: CartItem[], id: number, newQuantity: number) => {
  const targetIndex = cartList.findIndex(cartItem => cartItem.id === id);
  const targetCart = cartList[targetIndex];
  const updatedCart = {
    ...targetCart,
    quantity: newQuantity
  };
  cartList[targetIndex] = updatedCart;
  return cartList;
};

export const initCartListCheckbox = (cartListState: CartItem[], newChecked: boolean) => {
  const cartList = [...cartListState];
  return cartList.map((cartItem: ReceivedCartItem) => ({
    ...cartItem,
    checked: newChecked
  }));
};

export const updateCartCheckbox = (cartListState: CartItem[], id: number) => {
  const cartList = [...cartListState];
  const targetIndex = cartList.findIndex(cartItem => cartItem.id === id);
  const targetCart = cartList[targetIndex];
  const updatedCart = {
    ...targetCart,
    checked: !targetCart.checked
  };
  cartList[targetIndex] = updatedCart;
  return cartList;
};
