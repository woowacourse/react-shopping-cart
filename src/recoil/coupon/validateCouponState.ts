import { selector, snapshot_UNSTABLE } from "recoil";
import { selectedCouponSetSelector } from "./couponState";
import { validateCouponConditionSet } from "./validateCouponApplicability";
import { orderPriceSelector } from "../cart/orderSummaryState";
import { cartItemListAtom } from "../cart/cartItemState";

export const validCouponSelectedSetSelector = selector({
  key: "validCouponSelectedSetSelector",
  get: ({ get }) => {
    get(cartItemListAtom);
    const selectedCouponSet = get(selectedCouponSetSelector);
    const snapshot = snapshot_UNSTABLE();

    console.log(snapshot.getLoadable(orderPriceSelector).contents);
    return [...selectedCouponSet].map((coupon) => validateCouponConditionSet.minimumAmount(coupon, snapshot));
  },
});
