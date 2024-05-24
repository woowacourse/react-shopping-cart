import { FREE_SHIPPING_THRESHOLD, ShippingFeeType } from "@/constants/cart";
import { atom, selector } from "recoil";
import { selectedCartItemsIdState } from "./selectedCardItems";
import { totalOrderPriceSelector } from "./orderInformation";

export const shippingFeeState = atom<ShippingFeeType>({
  key: "shippingFeeType",
  default: "basic",
});

export const shippingFeeSelector = selector({
  key: "shippingFeeSelector",
  get: ({ get }) => {
    const selectedCartItems = get(selectedCartItemsIdState);
    const totalOrderPrice = get(totalOrderPriceSelector);
    const shippingFeeType = get(shippingFeeState);

    const isFreeShipping =
      selectedCartItems.length > 0 &&
      totalOrderPrice >= FREE_SHIPPING_THRESHOLD;

    if (isFreeShipping) return "free";
    return shippingFeeType;
  },
});
