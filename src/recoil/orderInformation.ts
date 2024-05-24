import { atom, selector } from "recoil";

import { cartItemsState } from "./cartItems";

import { cartItemQuantityState } from "./cartItemQuantity";
import { selectedCartItemsIdState } from "./selectedCardItems";
import { ShippingFeeType } from "@/constants/cart";

export const totalOrderPriceSelector = selector({
  key: "totalOrderPriceSelector",
  get: ({ get }) => {
    const cartItemList = get(cartItemsState);
    const selectedItemsId = get(selectedCartItemsIdState);

    const totalPrice = selectedItemsId.reduce((acc, productId) => {
      const productInfo = cartItemList.find((item) => item.id == productId)!;
      const quantity = get(cartItemQuantityState(productId));
      acc += productInfo.product.price * quantity;
      return acc;
    }, 0);
    return totalPrice;
  },
});

export const shippingFeeTypeState = atom<ShippingFeeType>({
  key: "shippingTypeFee",
  default: "BASIC",
});

export const totalItemOrderCountSelector = selector({
  key: "totalItemOrderCountSelector",

  get: ({ get }) => {
    const selectedItemsId = get(selectedCartItemsIdState);
    const totalItemOrderCount = selectedItemsId.reduce((acc, id) => {
      const itemQuantity = get(cartItemQuantityState(id));
      acc += itemQuantity;
      return acc;
    }, 0);

    return totalItemOrderCount;
  },
});
