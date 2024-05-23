import { atom, selector } from "recoil";
import { cartItemsState } from "./cartItems";
import { isCartItemsSelectedState } from "./cartItemSelections";

import { CART_PRICE } from "@/constants/cart";

type ShippingArea = "standard" | "remote";

export const shippingAreaState = atom<ShippingArea>({
  key: "shoppingAreaState",
  default: "standard",
});

const calculateShippingFee = (
  orderAmount: number,
  shippingArea: ShippingArea
) => {
  if (orderAmount === 0) return 0;

  const shippingFee = CART_PRICE.shippingFees[shippingArea];

  return orderAmount >= CART_PRICE.minOrderAmount ? 0 : shippingFee;
};

export const cartAmountState = selector({
  key: "cartAmountState",
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const shippingArea = get(shippingAreaState);

    const orderAmount = cartItems.reduce((acc, item) => {
      const isSelected = get(isCartItemsSelectedState(item.id));
      return isSelected ? acc + item.product.price * item.quantity : acc;
    }, 0);

    const shippingFee = calculateShippingFee(orderAmount, shippingArea);
    const totalAmount = orderAmount + shippingFee;

    return { orderAmount, shippingFee, totalAmount };
  },
});
