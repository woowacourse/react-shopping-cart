import { http, HttpResponse } from "msw";
import fixtures from "../../fixtures";

const handlers = [
  http.get("http://54.180.95.212:8080/cart-items", () => {
    return HttpResponse.json(fixtures);
  }),
];

export default handlers;
