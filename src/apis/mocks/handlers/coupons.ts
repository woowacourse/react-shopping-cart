import { http, HttpResponse } from "msw";
import MOCKING_CART_ITEMS_DATA from "../data/coupons.json";

const BASE_URL = import.meta.env.VITE_API_URL;

const coupons = { ...MOCKING_CART_ITEMS_DATA };

const getCoupons = http.get(`${BASE_URL}/coupons`, async () => {
  return HttpResponse.json(coupons);
});

export default [getCoupons];
