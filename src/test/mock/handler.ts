import { HttpResponse, http } from "msw";
import { dummy } from "./dummy";

export const handlers = [
  http.get(`${import.meta.env.VITE_API_BASE_URL}/cart-items`, () => {
    return HttpResponse.json(dummy);
  }),
];
