import { HttpResponse, http } from "msw";
import { coupons } from "../data/coupons";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const COUPON_URL = `${BASE_URL}/coupons`;

export const testStateStore = {
  shouldFailCart: false,
  customCartError: null as string | null,
  reset() {
    this.shouldFailCart = false;
    this.customCartError = null;
  },
};

const getCoupons = http.get(COUPON_URL, () => {
  const response = [...coupons];

  if (testStateStore.shouldFailCart) {
    return new HttpResponse(null, {
      status: 500,
      statusText: "Coupons fetch Failed",
    });
  }

  return HttpResponse.json(response);
});

export const couponsHandler = [getCoupons];
