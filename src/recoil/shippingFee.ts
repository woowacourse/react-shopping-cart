import { atom, selector } from "recoil";
import { totalOrderPriceSelector } from "./orderInformation";

import { CART_FEE } from "@/constants/cart";

export const remoteAreaState = atom<boolean>({
  key: "remoteAreaState",
  default: false,
});

export const shippingFeeSelector = selector({
  key: "shippingFeeSelector",
  get: ({ get }) => {
    const totalOrderPrice = get(totalOrderPriceSelector);

    if (totalOrderPrice >= CART_FEE.shippingFeeThreshold) return 0;

    const isRemoteArea = get(remoteAreaState);

    if (isRemoteArea)
      return CART_FEE.shippingFee + CART_FEE.remoteAreaShippingFee;

    return CART_FEE.shippingFee;
  },
});
