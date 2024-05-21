import { selector } from "recoil";
import { getCartItems } from "../../apis";
import { CartItemType } from "../../types/cart";
import { selectedListState } from "../atoms/atoms";
import {
  DEFAULT_DELIVERY_FEE,
  DELIVERY_FEE_THRESHOLD,
} from "../../constants/cart";

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
    const selectedList = get(selectedListState);

    const orderPrice = cartItems.reduce((acc, cartItem) => {
      if (selectedList.includes(cartItem.id)) {
        return acc + cartItem.product.price * cartItem.quantity;
      }
      return acc;
    }, 0);

    const deliveryFee =
      orderPrice === 0
        ? 0
        : orderPrice >= DELIVERY_FEE_THRESHOLD
        ? 0
        : DEFAULT_DELIVERY_FEE;

    return { orderPrice, deliveryFee, totalPrice: orderPrice + deliveryFee };
  },
});
