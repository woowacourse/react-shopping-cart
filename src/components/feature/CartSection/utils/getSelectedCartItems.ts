import { CartProduct } from "../../../../type/cart";

export const getSelectedCartItems = (
  cartItems: CartProduct[],
  selectedCartIds: number[]
) => {
  return cartItems.filter((item: CartProduct) =>
    selectedCartIds.includes(item.id)
  );
};
