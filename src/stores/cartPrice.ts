import { atom, selector } from "recoil";
import { cartItemsState } from "./cartItems";
import { cartItemSelectionsState } from "./cartItemSelections";

import { CART_PRICE } from "@/constants/cart";

type ShippingArea = "standard" | "remote";

export const shippingAreaState = atom<ShippingArea>({
  key: "shoppingAreaState",
  default: "standard",
});

const calculateShippingFee = (
  orderPrice: number,
  shippingArea: ShippingArea
) => {
  if (orderPrice === 0) return 0;

  const shippingFee = CART_PRICE.shippingFees[shippingArea];

  return orderPrice >= CART_PRICE.minOrderPrice ? 0 : shippingFee;
};

export const cartPriceState = selector({
  key: "cartPriceState",
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const shippingArea = get(shippingAreaState);

    const orderPrice = cartItems.reduce((acc, item) => {
      const isSelected = get(cartItemSelectionsState(item.id));
      return isSelected ? acc + item.product.price * item.quantity : acc;
    }, 0);

    const shippingFee = calculateShippingFee(orderPrice, shippingArea);
    const totalPrice = orderPrice + shippingFee;

    return { orderPrice, shippingFee, totalPrice };
  },
});
