import { CartItem } from "../types/types";

export const getQuantityByProductId = (cartList: CartItem[], id: number) => {
  const targetCart = cartList.find((cart) => cart.id === id);
  return targetCart?.quantity ?? 0;
};

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
