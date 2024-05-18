import { selector } from "recoil";

import { cartItems } from "./cartItems";

import { cartItemQuantity } from "./cartItemQuantity";
import { selectedCartItemsIdState } from "./selectedCardItems";
import { SHIPPING_INFO } from "@/constants/cart";

export const totalOrderPriceSelector = selector({
  key: "totalOrderPriceSelector",
  get: ({ get }) => {
    const cartItemList = get(cartItems);
    const selectedItemsId = get(selectedCartItemsIdState);

    const totalPrice = selectedItemsId.reduce((acc, productId) => {
      const productInfo = cartItemList.find((item) => item.id == productId)!;
      const quantity = get(cartItemQuantity(productId));
      acc += productInfo.product.price * quantity;
      return acc;
    }, 0);

    return totalPrice;
  },
});

export const shippingFeeSelector = selector({
  key: "shippingFeeSelector",
  get: ({ get }) => {
    const totalOrderPrice = get(totalOrderPriceSelector);
    const hasSelectedItems = get(selectedCartItemsIdState).length;
    return hasSelectedItems &&
      totalOrderPrice < SHIPPING_INFO.FREE_SHIPPING_THRESHOLD
      ? SHIPPING_INFO.SHIPPING_FEE
      : 0;
  },
});

export const totalItemLengthSelector = selector({
  key: "totalItemLengthSelector",
  get: ({ get }) => {
    const cartItemList = get(cartItems);

    return cartItemList.length;
  },
});

export const totalItemOrderCountSelector = selector({
  key: "finalOrderItemCountSelector",

  get: ({ get }) => {
    const selectedItemsId = get(selectedCartItemsIdState);
    const finalOrderItemCount = selectedItemsId.reduce((acc, id) => {
      const itemQuantity = get(cartItemQuantity(id));
      acc += itemQuantity;
      return acc;
    }, 0);

    return finalOrderItemCount;
  },
});
