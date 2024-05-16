import { selector } from "recoil";
import { getCartItems } from "../../apis";
import { CartItemType } from "../../types";
import { isSelectedState } from "../atoms/atoms";

export const cartItemsState = selector<CartItemType[]>({
  key: "cartItemsState",
  get: async () => {
    const cartItems = await getCartItems();

    return cartItems;
  },
});

export const cartPriceState = selector({
  key: "cartPriceState",
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const isSelected = get(isSelectedState);

    const orderPrice = cartItems.reduce((acc, cartItem) => {
      if (isSelected[cartItem.id.toString()]) {
        return acc + cartItem.product.price * cartItem.quantity;
      }
      return acc;
    }, 0);

    const deliveryFee = orderPrice === 0 ? 0 : orderPrice >= 100000 ? 0 : 3000;

    return { orderPrice, deliveryFee, totalPrice: orderPrice + deliveryFee };
  },
});
