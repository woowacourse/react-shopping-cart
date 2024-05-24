import { selector } from "recoil";
import { selectedCouponSetSelector } from "./couponState";

// 할인 적용
const a = selector({
  key: "a",
  get: ({ get }) => {
    get(selectedCouponSetSelector);
  },
});
