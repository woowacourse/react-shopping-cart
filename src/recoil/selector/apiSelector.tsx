import { selector } from "recoil";
import { fetchCoupons } from "../../api/couponApi";

// 쿠폰 조회 api 호출
export const fetchCouponsSelector = selector({
  key: "fetchCouponsSelector",
  get: async () => {
    const coupons = await fetchCoupons();
    return coupons;
  },
});
