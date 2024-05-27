import { atom, selector } from "recoil";
import { cartItemSelectedSelector } from "./cartItemState";
import { selectedCouponDiscountPriceSelector } from "../coupon/couponState";

export const orderPriceSelector = selector({
  key: "orderPriceSelector",
  get: ({ get }) => get(cartItemSelectedSelector).reduce((acc, item) => acc + item.quantity * item.product.price, 0),
});

export const isRuralAtom = atom<boolean>({ key: "isRuralAtom", default: false });

export const shippingFeeSelector = selector({
  key: "shippingFeeSelector",
  get: ({ get }) => {
    if (get(orderPriceSelector) >= 100000) return 0;
    if (get(isRuralAtom)) return 6000;
    return 3000;
  },
});

export const totalPriceSelector = selector({
  key: "totalPriceSelector",
  get: ({ get }) => get(orderPriceSelector) + get(shippingFeeSelector) - get(selectedCouponDiscountPriceSelector),
});

export const totalCountSelector = selector({
  key: "totalCountSelector",
  get: ({ get }) => get(cartItemSelectedSelector).reduce((acc, item) => acc + item.quantity, 0),
});
