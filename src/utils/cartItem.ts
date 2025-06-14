import { CartItemType } from "../types/response";

export const findCartItemById = (cartId: number, cartItems: CartItemType[]) => {
  const target = cartItems.find((item) => item.id === cartId);
  if (!target) {
    throw new Error(
      "장바구니 아이템을 찾을 수 없습니다. 장바구니 목록 또는 장바구니 id를 확인해주세요."
    );
  }

  return target;
};

export const getSelectedCartItems = (
  cartItems: CartItemType[],
  selectedCartIds: number[]
) => {
  return cartItems.filter((cartItem) => selectedCartIds.includes(cartItem.id));
};
