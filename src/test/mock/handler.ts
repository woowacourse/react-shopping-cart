import { HttpResponse, http } from "msw";
import { dummy } from "./dummy";

export const handlers = [
  http.get(`http://54.180.95.212:8080/cart-items`, () => {
    return HttpResponse.json(dummy);
  }),
];
