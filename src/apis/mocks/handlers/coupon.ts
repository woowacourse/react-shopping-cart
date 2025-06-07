import { http, HttpResponse } from "msw";
import { CouponResponse } from "../../../types/coupon";
import MOCKING_COUPONS_DATA from "../data/coupons.json";

const BASE_URL = import.meta.env.VITE_API_URL;

const coupons = MOCKING_COUPONS_DATA as CouponResponse[];

const getCoupons = http.get(`${BASE_URL}/coupons`, () => {
  return HttpResponse.json(coupons);
});

export default [getCoupons];
