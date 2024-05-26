import { HttpResponse, http } from "msw";
import { freeShippingDummy } from "./testMockData";
import { DUMMY_CART_DATA, DUMMY_COUPON_DATA } from "./fetchMockData";

const TOTAL_COUNTS = freeShippingDummy.content.reduce((acc, product) => acc + product.quantity, 0);

export const handlers = [
  http.get(`${import.meta.env.VITE_API_BASE_URL}/cart-items`, () => {
    return HttpResponse.json(DUMMY_CART_DATA);
  }),
  http.get(`${import.meta.env.VITE_API_BASE_URL}/cart-items/counts`, () => {
    return HttpResponse.json({ quantity: TOTAL_COUNTS });
  }),
  http.get(`${import.meta.env.VITE_API_BASE_URL}/coupons`, () => {
    return HttpResponse.json(DUMMY_COUPON_DATA);
  }),
  http.post(`${import.meta.env.VITE_API_BASE_URL}/orders`, () => {
    alert("place an order");
    return HttpResponse.json({ ok: true });
  }),
];
