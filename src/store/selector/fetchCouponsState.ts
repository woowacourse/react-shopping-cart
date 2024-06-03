import { selector } from "recoil";
import { fetchCoupons } from "../api";

export const fetchCouponsState = selector({
  key: "fetchCouponsState",
  get: async () => {
    return await fetchCoupons();
  },
});
