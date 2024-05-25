import { FREE_SHIPPING_THRESHOLD, ShippingFeeType } from "@/constants/cart";
import { atom, selector } from "recoil";
import { selectedCartItemsIdState } from "./selectedCardItems";
import { totalItemsPriceSelector } from "./orderInformation";

export const shippingFeeState = atom<ShippingFeeType>({
  key: "shippingFeeType",
  default: "basic",
});

export const freeShippingCouponState = atom<boolean>({
  key: "freeShippingCouponState",
  default: false,
});

export const isFreeShipping = selector({
  key: "isFreeShipping",
  get: ({ get }) => {
    const selectedCartItems = get(selectedCartItemsIdState);
    const totalOrderPrice = get(totalItemsPriceSelector);
    return (
      selectedCartItems.length > 0 && totalOrderPrice >= FREE_SHIPPING_THRESHOLD
    );
  },
});

export const shippingFeeSelector = selector({
  key: "shippingFeeSelector",
  get: ({ get }) => {
    const freeShipping = get(isFreeShipping) || get(freeShippingCouponState);
    const shippingFeeType = get(shippingFeeState);
    return freeShipping ? "free" : shippingFeeType;
  },
  set: ({ get, set }) => {
    const freeShipping = get(isFreeShipping);
    if (freeShipping) {
      set(shippingFeeState, "free");
    }
  },
});
