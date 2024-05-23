import { selector } from "recoil";
import { fetchCouponList } from "../../api/coupon";

export const fetchCouponListSelector = selector({
  key: "fetchCouponListSelector",
  get: fetchCouponList,
});
