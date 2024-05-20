import { HttpResponse, http } from "msw";
import { freeShippingDummy } from "./dummy";

const DUMMY_DATA = freeShippingDummy;

const TOTAL_COUNTS = freeShippingDummy.content.reduce((acc, product) => acc + product.quantity, 0);

export const handlers = [
  http.get(`${import.meta.env.VITE_API_BASE_URL}/cart-items`, () => {
    return HttpResponse.json(DUMMY_DATA);
  }),
  http.get(`${import.meta.env.VITE_API_BASE_URL}/cart-items/counts`, () => {
    return HttpResponse.json({ quantity: TOTAL_COUNTS });
  }),
];
