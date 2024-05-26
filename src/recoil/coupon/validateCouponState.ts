import { Snapshot, selector, snapshot_UNSTABLE, useRecoilCallback, useRecoilSnapshot } from "recoil";
import { isSelectedCouponAtomFamily, selectedCouponSetSelector } from "./couponState";
import { validateCouponApplicability, validateCouponConditionSet } from "./validateCouponApplicability";
import { orderPriceSelector } from "../cart/orderSummaryState";
import { cartItemListAtom } from "../cart/cartItemState";
import { checkedIdSetSelector } from "../cart/checkedState";

export const validCouponSelectedSetSelector = selector({
  key: "validCouponSelectedSetSelector",
  get: ({ get }) => {
    get(cartItemListAtom);
    get(checkedIdSetSelector);
    const selectedCouponSet = get(selectedCouponSetSelector);
    const snapshot = useRecoilSnapshot();

    return new Set([...selectedCouponSet].filter((coupon) => validateCouponApplicability(coupon, snapshot)));
  },
});
